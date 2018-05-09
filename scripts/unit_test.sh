#! /usr/bin/env bash
set -eu

. $(dirname $0)/env.sh

# eslint docker
docker run --rm --name ${ECR_REPO_NAME}-unit_test ${REPOSITORY_URI} npm run test:unit