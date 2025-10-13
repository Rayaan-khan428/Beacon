# How the Beacon System Works

## 🏗️ Architecture Overview

```
User's Phone (Satellite SMS)
        ↓
Twilio (SMS Gateway)
        ↓
API Gateway (AWS) - /webhook endpoint
        ↓
Lambda Function (beacon-ai-dev)
        ↓
    ┌───┴───┐
    ↓       ↓
Gemini API  Weather API
    ↓       ↓
Response compressed & sent back via Twilio
        ↓
User's Phone
```

## 🔐 Secrets Management

**All secrets are stored in AWS Systems Manager Parameter Store**, NOT in code or environment variables hardcoded in Lambda.

### Why Parameter Store?

- ✅ Encrypted at rest
- ✅ Version controlled
- ✅ Audit trail of who accessed what
- ✅ Never committed to git
- ✅ Easy rotation without redeploying code

### How It Works:

1. Secrets stored at: `/beacon/{environment}/{secret-name}`

   - Example: `/beacon/dev/gemini-api-key`
   - Example: `/beacon/prod/twilio-auth-token`

2. Lambda fetches secrets at **cold start** (first invocation):

   ```python
   # In lambda_function.py
   GEMINI_API_KEY = get_parameter('GEMINI_API_KEY')
   ```

3. The `get_parameter()` function:
   - First checks local `.env` file (for local development)
   - If not found, fetches from Parameter Store using boto3
   - Caches the value for subsequent invocations

### Secrets by Environment:

| Secret Name           | Type         | Used For                         |
| --------------------- | ------------ | -------------------------------- |
| `gemini-api-key`      | SecureString | AI responses via Google Gemini   |
| `weather-api-key`     | SecureString | Weather data from OpenWeatherMap |
| `twilio-account-sid`  | SecureString | Twilio authentication            |
| `twilio-auth-token`   | SecureString | Twilio authentication            |
| `twilio-phone-number` | String       | Your Twilio phone number         |

---

## 📦 Infrastructure as Code (SAM)

### What is SAM?

**AWS Serverless Application Model** - A framework for building serverless apps on AWS.

### Key Files:

#### 1. `template.yaml` - The Blueprint

Defines all AWS resources:

- Lambda function (compute)
- API Gateway (HTTP endpoint)
- IAM roles (permissions)
- Environment variables

**Key sections:**

```yaml
Resources:
  BeaconFunction: # Your Lambda function
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.13 # Python version
      Handler: lambda_function.lambda_handler # Entry point
      Timeout: 30 # Max execution time
      MemorySize: 512 # RAM allocation

      Environment:
        Variables:
          ENVIRONMENT: dev # Tells Lambda which secrets to fetch

      Policies: # Permissions
        - SSM Parameter Store read access

      Events:
        TwilioWebhook: # Creates API Gateway endpoint
          Type: Api
          Path: /webhook
          Method: post
```

#### 2. `samconfig.toml` - Deployment Configuration

Contains settings for each environment:

- Stack name (CloudFormation stack)
- AWS region
- S3 bucket for code upload
- Parameters to pass to template

**Three environments configured:**

- `default` → deploys to `beacon-ai-dev`
- `staging` → deploys to `beacon-ai-staging`
- `production` → deploys to `beacon-ai-prod`

#### 3. `requirements.txt` - Python Dependencies

All packages your Lambda needs:

```
requests==2.31.0        # HTTP requests to Gemini/Weather APIs
twilio==8.10.0          # Send SMS responses
python-dotenv==1.0.0    # Load .env for local testing
boto3==1.34.0           # AWS SDK (Parameter Store access)
```

---

## 🚀 Deployment Process

### What Happens When You Run `sam deploy`?

1. **Build Phase** (`sam build`):

   ```
   - Reads template.yaml
   - Downloads Python dependencies from requirements.txt
   - Packages everything into .aws-sam/build/
   ```

2. **Upload Phase**:

   ```
   - Creates/uses S3 bucket (aws-sam-cli-managed-default-*)
   - Uploads packaged code (~18MB) to S3
   - Uploads processed CloudFormation template
   ```

3. **Deploy Phase**:

   ```
   - Creates CloudFormation stack (beacon-ai-dev)
   - CloudFormation creates resources in order:
     a. IAM Role (BeaconFunctionRole) with SSM permissions
     b. Lambda Function (beacon-ai-dev)
     c. API Gateway (ServerlessRestApi)
     d. API Gateway Deployment & Stage
     e. Lambda Permission (allows API Gateway to invoke)
   ```

4. **Output**:
   ```
   - API Gateway URL: https://{random}.execute-api.us-east-1.amazonaws.com/Prod/webhook
   - Lambda ARN: arn:aws:lambda:us-east-1:629664187828:function:beacon-ai-dev
   ```

### Deployment Artifacts:

- **S3 Bucket**: Stores Lambda code packages
- **CloudFormation Stack**: Manages all resources as a unit
- **.aws-sam/ directory**: Local build artifacts (gitignored)

---

## 🔄 Request Flow

### When a user sends "What is the weather?"

1. **Twilio receives SMS** → Sends HTTP POST to your webhook

   ```
   POST https://5bjh0my5af.execute-api.us-east-1.amazonaws.com/Prod/webhook
   Body: Body=What%20is%20the%20weather%3F&From=%2B15551234567
   ```

2. **API Gateway** receives request → Invokes Lambda

   ```json
   {
     "body": "Body=What%20is%20the%20weather%3F&From=%2B15551234567",
     "headers": {...},
     "httpMethod": "POST"
   }
   ```

3. **Lambda Function** executes:

   ```python
   a. Parses Twilio webhook data
   b. Checks if it's a weather or AI request
   c. Calls Weather API or Gemini API
   d. Compresses response to save satellite bandwidth
   e. Sends SMS via Twilio
   f. Returns HTTP 200 to API Gateway
   ```

4. **User receives response** via Twilio SMS

### Cold Start vs Warm Start:

- **Cold Start** (first invocation or after ~15 min idle):

  - Lambda container starts
  - Python interpreter loads
  - Imports libraries
  - **Fetches secrets from Parameter Store** ← happens here
  - Executes handler
  - **Time**: ~2-5 seconds

- **Warm Start** (subsequent invocations):
  - Container already running
  - Secrets already cached in memory
  - Just executes handler
  - **Time**: ~200-500ms

---

## 🧪 Local Development

### Two Ways to Test Locally:

#### Option 1: Direct Python Execution

```bash
# Create .env file with your secrets
python lambda_function.py  # Won't work without handler invocation
python test_local.py       # Run unit tests
```

#### Option 2: SAM Local (Requires Docker)

```bash
sam build
sam local invoke BeaconFunction --event test_event.json
# OR
sam local start-api  # Starts local API Gateway on port 3000
```

**Why Docker?**

- Simulates actual Lambda environment
- Uses official AWS Lambda runtime containers
- Tests with same Python version, permissions, etc.

---

## 📊 Monitoring & Logs

### CloudWatch Logs

Every Lambda invocation creates logs at:

- Log Group: `/aws/lambda/beacon-ai-dev`
- Log Stream: `2025/10/06/[$LATEST]abc123...`

**What gets logged:**

```python
print("Received event:", json.dumps(event))  # Request data
print(f"Message from {user_number}: {user_message}")  # User message
print("Routing to weather handler")  # Decision logic
print(f"Compressed response: {compressed_response}")  # Final response
```

**View logs:**

```bash
# Real-time tail
sam logs -n BeaconFunction --stack-name beacon-ai-dev --tail

# Last 30 minutes
sam logs -n BeaconFunction --stack-name beacon-ai-dev --start-time '30min ago'
```

### Lambda Metrics (CloudWatch)

- **Invocations**: How many times Lambda ran
- **Duration**: Average execution time
- **Errors**: Failed invocations
- **Throttles**: Rate limit hits
- **Concurrent Executions**: Simultaneous invocations

---

## 🔑 IAM Permissions

### Your IAM User Needs:

1. **AWSCloudFormationFullAccess** - Deploy/update stacks
2. **AmazonS3FullAccess** - Upload Lambda code
3. **AWSLambda_FullAccess** - Create/update Lambda functions
4. **IAMFullAccess** - Create Lambda execution roles
5. **AmazonAPIGatewayAdministrator** - Create API endpoints
6. **AmazonSSMFullAccess** - Store/retrieve secrets
7. **Custom policies** (BeaconParameterStoreAccess, BeaconLambdaDeploymentAccess)

### Lambda Execution Role:

Created automatically by SAM, grants Lambda permission to:

- Write to CloudWatch Logs
- Read from Parameter Store (`/beacon/{environment}/*`)

---

## 🌍 Multiple Environments

### Current Setup:

| Environment | Stack Name        | Purpose                      |
| ----------- | ----------------- | ---------------------------- |
| `dev`       | beacon-ai-dev     | Active development & testing |
| `staging`   | beacon-ai-staging | Pre-production testing       |
| `prod`      | beacon-ai-prod    | Production (customer-facing) |

### How Environments Work:

1. **Separate CloudFormation stacks** - Isolated resources
2. **Separate Parameter Store paths** - `/beacon/dev/*` vs `/beacon/prod/*`
3. **Same code, different config** - Lambda reads `ENVIRONMENT` variable

### Deploying to Different Environments:

```bash
# Development
sam deploy --config-env default

# Staging
sam deploy --config-env staging

# Production
sam deploy --config-env production
```

---

## 💰 Cost Breakdown

**Current Monthly Cost Estimate (Light Usage):**

- Lambda: ~$0.20 (1 million requests free tier)
- API Gateway: ~$3.50 (1 million requests free tier first year)
- S3: ~$0.05 (deployment artifacts)
- Parameter Store: Free (Standard parameters)
- CloudWatch Logs: ~$0.50 (first 5GB free)

**Per Request Cost:**

- Lambda: $0.0000002 per request
- API Gateway: $0.0000035 per request
- **Total**: ~$0.0000037 per SMS (~$3.70 per million messages)

**Note**: Twilio SMS costs are separate (~$0.0075 per message)

---

## 🔄 Comparison: Old vs New Workflow

### Old Workflow (Manual ZIP Upload):

```
1. Edit code locally
2. Zip lambda_function.py + dependencies
3. Go to AWS Console
4. Navigate to Lambda
5. Upload ZIP (wait for upload)
6. Test manually
7. No version control
8. Hope nothing breaks
```

### New Workflow (SAM):

```
1. Edit code locally
2. Run: sam build
3. Run: sam deploy --config-env default
4. Done! (Auto-creates/updates everything)
5. Git tracks all changes
6. Can rollback easily
7. Same process for all environments
```

---

## 🎯 Key Concepts Summary

| Concept             | What It Is                    | Why It Matters              |
| ------------------- | ----------------------------- | --------------------------- |
| **SAM**             | Framework for serverless apps | Deploy with one command     |
| **CloudFormation**  | AWS infrastructure as code    | Manages resources as a unit |
| **Parameter Store** | Secure secrets storage        | Never commit secrets to git |
| **API Gateway**     | HTTP endpoint                 | Receives Twilio webhooks    |
| **Lambda**          | Serverless compute            | Runs your Python code       |
| **Cold Start**      | First invocation              | Fetches secrets, slower     |
| **IAM**             | Permissions system            | Controls who can do what    |

---

## 📚 Additional Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Parameter Store Guide](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
- [Twilio Webhook Documentation](https://www.twilio.com/docs/usage/webhooks)

---

**Questions?** Check the troubleshooting section in `DEPLOYMENT_CHECKLIST.md`
