# Beacon AI Lambda Function

AWS Lambda function that handles SMS messages via Twilio, providing AI responses (Gemini) and weather information.

## 🚀 Quick Start for New Team Members

### Prerequisites
1. Install AWS CLI: `brew install awscli`
2. Install AWS SAM CLI: `brew install aws-sam-cli`
3. Configure AWS credentials: `aws configure`
4. Python 3.13 installed

### Initial Setup
1. Clone the repository
2. Navigate to lambda directory: `cd lambda`
3. Set up secrets (first time only): `./setup_secrets.sh dev`

## 📦 Local Development

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Build the Lambda
```bash
sam build
```

### Test Locally
```bash
# Invoke function with test event
sam local invoke BeaconFunction --event test_event.json

# Start local API Gateway
sam local start-api
# Then test with: curl -X POST http://localhost:3000/webhook -d "Body=weather&From=+1234567890"
```

### Run Unit Tests
```bash
python test_local.py
```

## 🚢 Deployment

### Deploy to Development
```bash
sam build
sam deploy --config-env default
```

### Deploy to Staging
```bash
sam build
sam deploy --config-env staging
```

### Deploy to Production
```bash
sam build
sam deploy --config-env production
```

## 🔐 Secrets Management

All secrets are stored in AWS Systems Manager Parameter Store under `/beacon/{environment}/`.

### View All Secrets for an Environment
```bash
aws ssm get-parameters-by-path --path /beacon/dev --with-decryption
```

### Update a Single Secret
```bash
aws ssm put-parameter \
  --name /beacon/dev/gemini-api-key \
  --value "your-new-key" \
  --type SecureString \
  --overwrite
```

### Required Secrets
- `gemini-api-key` - Google Gemini API key
- `weather-api-key` - OpenWeatherMap API key
- `twilio-account-sid` - Twilio account SID
- `twilio-auth-token` - Twilio auth token
- `twilio-phone-number` - Twilio phone number

## 📁 Project Structure

```
lambda/
├── lambda_function.py    # Main Lambda handler
├── requirements.txt      # Python dependencies
├── template.yaml         # SAM/CloudFormation template
├── samconfig.toml       # SAM deployment config
├── test_event.json      # Sample event for local testing
├── test_local.py        # Unit tests
├── setup_secrets.sh     # Helper script for secrets
└── README.md            # This file
```

## 🔄 Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally: `sam local invoke BeaconFunction --event test_event.json`
4. Deploy to dev: `sam deploy --config-env default`
5. Test in dev environment
6. Create PR to merge into main
7. After approval, main branch auto-deploys to production (via CI/CD)

## 🧪 Testing

### Test Event Format
Edit `test_event.json` to test different scenarios:
- Weather request: `Body=weather&From=%2B1234567890`
- AI question: `Body=What%20is%20the%20capital%20of%20France%3F&From=%2B1234567890`
- Coordinates: `Body=37.7749%2C-122.4194&From=%2B1234567890`

### Adding Unit Tests
Add tests to `test_local.py`. Run with:
```bash
python test_local.py
```

## 🆘 Troubleshooting

### SAM Build Fails
- Ensure Python 3.13 is installed
- Check that requirements.txt has all dependencies

### Deployment Fails with "Unable to resolve parameter"
- Make sure secrets are stored in Parameter Store
- Run: `./setup_secrets.sh dev` (or staging/prod)

### Function Times Out
- Check CloudWatch Logs: `sam logs -n BeaconFunction --stack-name beacon-ai-dev`
- Increase timeout in template.yaml

### Can't Find API Endpoint
After deployment, get the endpoint:
```bash
aws cloudformation describe-stacks \
  --stack-name beacon-ai-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`BeaconFunctionApi`].OutputValue' \
  --output text
```

## 📊 Monitoring

### View Logs
```bash
# Real-time logs
sam logs -n BeaconFunction --stack-name beacon-ai-dev --tail

# Logs from last 10 minutes
sam logs -n BeaconFunction --stack-name beacon-ai-dev --start-time '10min ago'
```

### CloudWatch Dashboard
View metrics in AWS Console:
- Lambda → Functions → beacon-ai-{env} → Monitoring

## 🔧 Configuration

### Change AWS Region
Edit `samconfig.toml` and update the `region` parameter.

### Adjust Lambda Resources
Edit `template.yaml`:
- `Timeout`: Execution timeout (seconds)
- `MemorySize`: Memory allocation (MB)
- `Runtime`: Python version

## 🤝 Contributing

1. Always work in a feature branch
2. Test locally before deploying
3. Deploy to dev/staging before production
4. Write unit tests for new features
5. Update this README if you add new functionality

## 📞 Support

- Check CloudWatch Logs first
- Review Lambda function code in `lambda_function.py`
- Test with `sam local invoke` to debug locally

