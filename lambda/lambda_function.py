import json
import requests
import os
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables from .env file (sfor local testing)
load_dotenv('.env')


# Get environment variables (set in AWS Lambda configuration or .env file)
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY')
TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.environ.get('TWILIO_PHONE_NUMBER')

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def lambda_handler(event, context):
    """
    Main entry point for AWS Lambda
    Receives SMS from Twilio, processes it, and sends response
    """
    
    print("Received event:", json.dumps(event))
    
    try:
        # Parse incoming SMS from Twilio webhook
        body = parse_twilio_webhook(event)
        user_message = body.get('Body', '').strip()
        user_number = body.get('From', '')
        
        print(f"Message from {user_number}: {user_message}")
        
        # Check if message is empty
        if not user_message:
            send_sms(user_number, "Empty message received. Please send a question or weather request.")
            return success_response("Empty message handled")
        
        # Route based on message type
        if is_weather_request(user_message):
            print("Routing to weather handler")
            response = handle_weather_request(user_message)
        else:
            print("Routing to AI handler")
            response = handle_ai_request(user_message)
        
        # Compress response for satellite efficiency
        compressed_response = compress_message(response)
        
        print(f"Compressed response ({len(compressed_response)} chars): {compressed_response}")
        
        # Send SMS back to user
        send_sms(user_number, compressed_response)
        
        return success_response("Message processed successfully")
        
    except Exception as e:
        print(f"Error processing message: {str(e)}")
        return error_response(str(e))


def parse_twilio_webhook(event):
    """
    Parse the Twilio webhook POST data from API Gateway
    """
    if 'body' in event:
        # API Gateway sends the body as a string
        import urllib.parse
        body_string = event['body']
        return dict(urllib.parse.parse_qsl(body_string))
    return {}


def is_weather_request(message):
    """
    Determine if the message is asking for weather
    Checks for coordinates or weather keywords
    """
    message_lower = message.lower()
    
    # Check for weather keywords
    weather_keywords = ['weather', 'forecast', 'temp', 'temperature', 'rain', 'snow', 'wind']
    has_keyword = any(keyword in message_lower for keyword in weather_keywords)
    
    # Check for coordinates (looks for numbers with optional decimal/comma)
    import re
    # Pattern for coordinates like "37.7749, -122.4194" or "37.7749,-122.4194"
    coord_pattern = r'-?\d+\.?\d*\s*,\s*-?\d+\.?\d*'
    has_coords = bool(re.search(coord_pattern, message))
    
    return has_coords or has_keyword


def handle_weather_request(message):
    """
    Fetch weather data from OpenWeatherMap API
    """
    import re
    
    # Try to extract coordinates from message
    coord_pattern = r'(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)'
    coord_match = re.search(coord_pattern, message)
    
    if coord_match:
        lat = float(coord_match.group(1))
        lon = float(coord_match.group(2))
    else:
        # Default to San Francisco if no coordinates provided
        lat, lon = 37.7749, -122.4194
        print(f"No coordinates found, using default: {lat}, {lon}")
    
    # Call OpenWeatherMap API
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=imperial"
    
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # Extract key weather info
        weather_desc = data['weather'][0]['description']
        temp = round(data['main']['temp'])
        feels_like = round(data['main']['feels_like'])
        humidity = data['main']['humidity']
        wind_speed = round(data['wind']['speed'])
        
        # Format response
        weather_response = f"Weather: {weather_desc}. Temp: {temp}°F (feels {feels_like}°F). Humidity: {humidity}%. Wind: {wind_speed}mph"
        
        return weather_response
        
    except requests.exceptions.Timeout:
        return "Weather service timeout. Try again."
    except requests.exceptions.RequestException as e:
        print(f"Weather API error: {e}")
        return "Weather data unavailable. Check coordinates."
    except KeyError as e:
        print(f"Weather data parsing error: {e}")
        return "Error reading weather data."


def handle_ai_request(message):
    """
    Send request to OpenAI API for general questions
    """
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # System prompt optimized for emergency/satellite use
    system_prompt = """You are an emergency AI assistant for satellite messaging. 
    Provide critical, concise answers. Maximum 2-3 sentences. 
    Use abbreviations when possible. Focus on actionable advice.
    If medical emergency, emphasize seeking professional help."""
    
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "max_tokens": 150,
        "temperature": 0.3
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()
        
        ai_response = data['choices'][0]['message']['content'].strip()
        return ai_response
        
    except requests.exceptions.Timeout:
        return "AI service timeout. Try simpler question."
    except requests.exceptions.RequestException as e:
        print(f"OpenAI API error: {e}")
        return "AI service unavailable. Try again later."
    except (KeyError, IndexError) as e:
        print(f"OpenAI response parsing error: {e}")
        return "Error processing AI response."


def compress_message(message):
    """
    Compress message using abbreviations to save satellite characters
    """
    # Abbreviation dictionary
    replacements = {
        'temperature': 'temp',
        'degrees': '°',
        'fahrenheit': 'F',
        'celsius': 'C',
        'weather': 'wx',
        'forecast': 'fcst',
        'precipitation': 'precip',
        'humidity': 'humid',
        'kilometers': 'km',
        'meters': 'm',
        'miles': 'mi',
        'emergency': 'emerg',
        'medical': 'med',
        'hospital': 'hosp',
        'should': 'shld',
        'would': 'wld',
        'could': 'cld',
        'minute': 'min',
        'hour': 'hr',
        'second': 'sec',
        'north': 'N',
        'south': 'S',
        'east': 'E',
        'west': 'W',
        'approximately': '~',
        'between': 'btwn',
        'without': 'w/o',
        'with': 'w/',
        'and': '&',
        'you': 'u',
        'your': 'ur',
        'are': 'r',
        'to': '2',
        'for': '4',
        'at': '@',
    }
    
    compressed = message
    
    # Apply replacements (case-insensitive)
    for full, abbrev in replacements.items():
        # Use word boundaries to avoid partial replacements
        import re
        pattern = re.compile(r'\b' + re.escape(full) + r'\b', re.IGNORECASE)
        compressed = pattern.sub(abbrev, compressed)
    
    # Remove extra spaces
    compressed = ' '.join(compressed.split())
    
    # Truncate if still too long (SMS limit is 160 chars, but leaving buffer)
    if len(compressed) > 160:
        compressed = compressed[:157] + "..."
    
    return compressed


def send_sms(to_number, message):
    """
    Send SMS via Twilio
    """
    try:
        twilio_message = twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_number
        )
        print(f"SMS sent successfully. SID: {twilio_message.sid}")
        return True
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return False


def success_response(message):
    """Return successful Lambda response"""
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': message
        })
    }


def error_response(error_message):
    """Return error Lambda response"""
    return {
        'statusCode': 500,
        'body': json.dumps({
            'error': error_message
        })
    }