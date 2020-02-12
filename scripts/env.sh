#!/usr/bin/env bash

set -ex

#  Environment variable from build kite
echo '--- :house_with_garden: Check the environment here'
export ACCOUNT_ID=943900301754
export BUILD_NUMBER=${BUILDKITE_BUILD_NUMBER:=snapshot}
export BUILD_COMMIT=${BUILDKITE_COMMIT:=snapshot}
export ECR_REPO_NAME="newlaunch-api-id"
export DEPLOYER_ECR_URL="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/deployer:latest"

ecr_url=${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com
export REPOSITORY_URI="${ecr_url}/${ECR_REPO_NAME}:${BUILD_NUMBER}"
export REPOSITORY_URI_LATEST="${ecr_url}/${ECR_REPO_NAME}:latest"

eval $(docker run --rm xueshanf/awscli aws ecr get-login --no-include-email --registry-ids ${ACCOUNT_ID} --region $REGION)


