from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(".env")

# Now import the lambda function
import lambda_function

# Test weather request
print("=" * 50)
print("TEST 1: Weather Request")
print("=" * 50)

test_event_weather = {"body": "Body=weather+37.7749%2C-122.4194&From=%2B16478036114"}

result = lambda_function.lambda_handler(test_event_weather, None)
print("Result:", result)

print("\n")

# Test AI request
print("=" * 50)
print("TEST 2: AI Request")
print("=" * 50)

test_event_ai = {"body": "Body=what+should+I+do+for+a+snake+bite&From=%2B16478036114"}

result = lambda_function.lambda_handler(test_event_ai, None)
print("Result:", result)
