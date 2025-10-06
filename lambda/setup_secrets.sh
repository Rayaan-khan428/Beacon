#!/bin/bash

# Script to store secrets in AWS Parameter Store
# Usage: ./setup_secrets.sh <environment>
# Example: ./setup_secrets.sh dev

set -e

ENVIRONMENT=${1:-dev}

echo "=========================================="
echo "Setting up secrets for environment: $ENVIRONMENT"
echo "=========================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   brew install awscli"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials are not configured. Please run:"
    echo "   aws configure"
    exit 1
fi

echo "✅ AWS CLI is configured"
echo ""

# Function to prompt and store parameter
store_parameter() {
    local param_name=$1
    local param_description=$2
    local param_type=${3:-SecureString}
    
    echo "📝 $param_description"
    read -p "Enter value (or press Enter to skip): " param_value
    
    if [ -z "$param_value" ]; then
        echo "⏭️  Skipped"
        echo ""
        return
    fi
    
    aws ssm put-parameter \
        --name "/beacon/$ENVIRONMENT/$param_name" \
        --value "$param_value" \
        --type "$param_type" \
        --overwrite \
        --description "$param_description for Beacon AI ($ENVIRONMENT)" \
        > /dev/null
    
    echo "✅ Stored /beacon/$ENVIRONMENT/$param_name"
    echo ""
}

echo "Let's set up your secrets. Press Enter to skip any parameter."
echo ""

store_parameter "gemini-api-key" "Gemini API Key (from Google AI Studio)"
store_parameter "weather-api-key" "OpenWeatherMap API Key"
store_parameter "twilio-account-sid" "Twilio Account SID"
store_parameter "twilio-auth-token" "Twilio Auth Token"
store_parameter "twilio-phone-number" "Twilio Phone Number (e.g., +1234567890)" "String"

echo "=========================================="
echo "✅ All secrets stored successfully!"
echo "=========================================="
echo ""
echo "To view your parameters:"
echo "  aws ssm get-parameters-by-path --path /beacon/$ENVIRONMENT --with-decryption"
echo ""
echo "To delete a parameter:"
echo "  aws ssm delete-parameter --name /beacon/$ENVIRONMENT/parameter-name"

