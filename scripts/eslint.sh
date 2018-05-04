#! /usr/bin/env bash
set -eu

echo -e '\033[0;31m'
echo "--------------Warning----------------"
echo "Need to fix the eslint first."
echo "----------Eslint Skipped---------"
echo -e '\033[0m'

. $(dirname $0)/env.sh

# eslint docker
docker run --rm --name ${ECR_REPO_NAME}-es_lint ${REPOSITORY_URI} npm run eslint

# flow docker
docker run --rm --name ${ECR_REPO_NAME}-flow ${REPOSITORY_URI} npm run flow
