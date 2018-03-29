#! /usr/bin/env bash
set -eu

echo -e '\033[0;31m'
echo "--------------Warning----------------"
echo "Need to setup mysql/redis/solr docker container to run integration test."
echo "----------Integration test Skipped---------"
echo -e '\033[0m'

docker run --rm -v $(pwd):/source -w /source node:8-alpine npm run test:integration
