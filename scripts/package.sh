#! /usr/bin/env bash
set -eux

# Setting up the environment Variable
. $(dirname $0)/env.sh

echo "Authenticating Docker Client to Registry"
eval $(docker run --rm xueshanf/awscli aws ecr get-login --no-include-email --registry-ids $ACCOUNT_ID --region $REGION)

echo "Building the Docker Image"
docker build -t ${ECR_REPO_NAME} .

echo "Tagging the Docker Image"
docker tag ${ECR_REPO_NAME}:latest ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO_NAME}:latest
docker tag ${ECR_REPO_NAME}:latest ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO_NAME}:${BUILD_NUMBER}

echo "Pushing the Image to ECR"
docker push ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO_NAME}:latest
docker push ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO_NAME}:${BUILD_NUMBER}

