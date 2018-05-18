#! /usr/bin/env bash
set -eu

echo -e '\033[0;31m'
echo "--------------Warning----------------"
echo "Need to setup mysql/redis/solr docker container to run integration test."
echo "----------Integration test Skipped---------"
echo -e '\033[0m'

#docker run --rm -t -d -p 3306:3306 --name some-mysql mysql:nl-test
#docker run --rm -t -d -p 8983:8983 --name some-solr solr:nl-test
#docker run --rm -t -d -p 6379:6379 --name some-redis redis:nl-test

#docker run --rm -t --link some-mysql:mysql --link some-redis:redis --link some-solr:solr node:nl npm run test:integration

#docker stop some-mysql some-solr some-redis
