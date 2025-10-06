# Deployment Checklist

Use this checklist before deploying to ensure everything is properly configured.

## ✅ Pre-Deployment Checklist

### First Time Setup (One-time per environment)

- [ ] **AWS CLI Installed & Configured**
  ```bash
  aws --version
  aws sts get-caller-identity  # Should show your AWS account
  ```

- [ ] **SAM CLI Installed**
  ```bash
  sam --version
  ```

- [ ] **Secrets Configured in Parameter Store**
  ```bash
  cd lambda
  ./setup_secrets.sh dev  # For dev environment
  # Verify:
  aws ssm get-parameters-by-path --path /beacon/dev --with-decryption
  ```

- [ ] **Test API Keys Work**
  - Test Gemini API key in browser/Postman
  - Test OpenWeatherMap API key
  - Test Twilio credentials

### Before Every Deployment

- [ ] **Code is committed to git**
  ```bash
  git status  # Should be clean or changes committed
  ```

- [ ] **Tests pass locally**
  ```bash
  cd lambda
  python test_local.py
  ```

- [ ] **Local build succeeds**
  ```bash
  sam build
  ```

- [ ] **Local testing works**
  ```bash
  sam local invoke BeaconFunction --event test_event.json
  ```

- [ ] **Correct environment selected**
  - Dev: `--config-env default`
  - Staging: `--config-env staging`
  - Production: `--config-env production`

## 🚀 Deployment Steps

### Deploy to Development
```bash
cd lambda
sam build
sam deploy --config-env default
```

### Deploy to Staging
```bash
cd lambda
sam build
sam deploy --config-env staging
```

### Deploy to Production
```bash
cd lambda
sam build
sam deploy --config-env production
```

## ✅ Post-Deployment Verification

- [ ] **Check deployment succeeded**
  - Look for "Successfully created/updated stack" message
  - Note the API Gateway endpoint URL in the output

- [ ] **Get the webhook URL**
  ```bash
  # For dev:
  aws cloudformation describe-stacks \
    --stack-name beacon-ai-dev \
    --query 'Stacks[0].Outputs[?OutputKey==`BeaconFunctionApi`].OutputValue' \
    --output text
  ```

- [ ] **Update Twilio webhook**
  - Go to Twilio Console → Phone Numbers → Your Number
  - Update "A MESSAGE COMES IN" webhook URL to the API Gateway endpoint
  - Save

- [ ] **Test with real SMS**
  - Send a test message to your Twilio number
  - Check it receives a response

- [ ] **Check CloudWatch Logs**
  ```bash
  sam logs -n BeaconFunction --stack-name beacon-ai-dev --tail
  ```

- [ ] **Verify no errors in logs**

## 🔄 Rollback (if needed)

If deployment fails or has issues:

```bash
# Option 1: Redeploy previous version
git checkout <previous-commit>
sam build
sam deploy --config-env <environment>

# Option 2: Delete stack and redeploy
aws cloudformation delete-stack --stack-name beacon-ai-dev
# Wait for deletion to complete, then redeploy
```

## 🐛 Common Issues & Solutions

### Issue: "Unable to resolve parameter"
**Solution**: Missing secret in Parameter Store
```bash
./setup_secrets.sh <environment>
```

### Issue: "Runtime python3.13 is not supported"
**Solution**: AWS Lambda doesn't support Python 3.13 yet. Use python3.12 in template.yaml

### Issue: "Stack already exists"
**Solution**: Update existing stack:
```bash
sam deploy --config-env <environment> --no-confirm-changeset
```

### Issue: Function times out
**Solution**: Check CloudWatch logs, increase timeout in template.yaml

### Issue: Twilio not receiving responses
**Solution**: 
1. Verify webhook URL is correct in Twilio console
2. Check CloudWatch logs for errors
3. Test API endpoint directly with curl

## 📊 Monitoring After Deployment

### Check Function Health
```bash
# View recent logs
sam logs -n BeaconFunction --stack-name beacon-ai-dev --start-time '30min ago'

# Watch logs in real-time
sam logs -n BeaconFunction --stack-name beacon-ai-dev --tail
```

### View Metrics in AWS Console
1. Go to AWS Lambda console
2. Select function: `beacon-ai-{environment}`
3. Click "Monitoring" tab
4. Review:
   - Invocation count
   - Error rate
   - Duration
   - Throttles

### Set Up Alarms (Recommended)
Create CloudWatch alarms for:
- Error rate > 5%
- Duration > 25 seconds (near timeout)
- Throttling events

## 📝 Environment-Specific Notes

### Development
- Used for testing new features
- OK to break occasionally
- Deploy frequently

### Staging
- Should mirror production
- Use for final testing before production
- Share with QA team

### Production
- Customer-facing
- Deploy only after testing in dev/staging
- Monitor closely after deployment
- Have rollback plan ready

## 🎯 Success Criteria

Deployment is successful when:
- ✅ Stack shows CREATE_COMPLETE or UPDATE_COMPLETE
- ✅ Function responds to test SMS
- ✅ No errors in CloudWatch logs
- ✅ Response time < 10 seconds
- ✅ All team members notified of deployment

