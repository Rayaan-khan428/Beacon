#!/bin/bash

# Script to attach necessary IAM policies for Beacon deployment
set -e

IAM_USER="satelitte-ai-developer"
ACCOUNT_ID="629664187828"

echo "=========================================="
echo "Setting up IAM permissions for: $IAM_USER"
echo "=========================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed."
    exit 1
fi

echo "Creating custom IAM policies..."
echo ""

# Create SSM Parameter Store policy
echo "1️⃣ Creating Parameter Store policy..."
aws iam create-policy \
    --policy-name BeaconParameterStoreAccess \
    --policy-document file://iam-policy-ssm.json \
    --description "Allows Beacon team to manage Parameter Store values" \
    2>/dev/null || echo "   Policy already exists, updating..."

# Attach SSM policy to user
aws iam attach-user-policy \
    --user-name $IAM_USER \
    --policy-arn arn:aws:iam::${ACCOUNT_ID}:policy/BeaconParameterStoreAccess

echo "✅ Parameter Store access granted"
echo ""

# Create Lambda deployment policy
echo "2️⃣ Creating Lambda deployment policy..."
aws iam create-policy \
    --policy-name BeaconLambdaDeploymentAccess \
    --policy-document file://iam-policy-lambda-deploy.json \
    --description "Allows Beacon team to deploy Lambda functions via SAM" \
    2>/dev/null || echo "   Policy already exists, updating..."

# Attach Lambda deployment policy to user
aws iam attach-user-policy \
    --user-name $IAM_USER \
    --policy-arn arn:aws:iam::${ACCOUNT_ID}:policy/BeaconLambdaDeploymentAccess

echo "✅ Lambda deployment access granted"
echo ""

echo "=========================================="
echo "✅ All permissions configured!"
echo "=========================================="
echo ""
echo "You can now:"
echo "  1. Store secrets: ./setup_secrets.sh dev"
echo "  2. Deploy Lambda: sam build && sam deploy --config-env default"
echo ""

