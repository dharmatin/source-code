#! /usr/bin/env bash
set -eu

echo -e '\033[0;31m'
echo "--------------Warning----------------"
echo "For now running unit test in pipeline is impossible
because in the unit test it calls real solr/redis/mysql
hosted in AWS development env."
echo "Code change is required to decouple these dependencies
then it's possible to mock solr/redis/mysql in unit test."
echo "----------Unit Test Skipped---------"
echo -e '\033[0m'

#docker run --rm -v $(pwd):/source -w /source node:8-alpine npm run test:unit
