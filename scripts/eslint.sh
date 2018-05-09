#! /usr/bin/env bash
set -eu

. $(dirname $0)/env.sh

# eslint docker
docker run --rm --name ${ECR_REPO_NAME}-es_lint ${REPOSITORY_URI} npm run eslint

# flow docker
docker run --rm --name ${ECR_REPO_NAME}-flow ${REPOSITORY_URI} npm run flow
