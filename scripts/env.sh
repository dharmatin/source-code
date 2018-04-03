#!/usr/bin/env bash

set -ex

#  Environment variable from build kite
echo '--- :house_with_garden: Check the environment here'
export ACCOUNT_ID=726150208279
export BUILD_NUMBER=${BUILDKITE_BUILD_NUMBER:=snapshot}
export BUILD_COMMIT=${BUILDKITE_COMMIT:=snapshot}
export ENV_VAR_BRANCH=${BUILDKITE_BRANCH:develop}
export ECR_REPO_NAME="newlaunch-api-id"
export DEPLOYER_ECR_URL="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/deployer:latest"

eval $(docker run --rm xueshanf/awscli aws ecr get-login --no-include-email --registry-ids ${ACCOUNT_ID} --region $REGION)


