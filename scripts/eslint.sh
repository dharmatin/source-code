#! /usr/bin/env bash
set -eu

echo -e '\033[0;31m'
echo "--------------Warning----------------"
echo "Need to fix the eslint first."
echo "----------Eslint Skipped---------"
echo -e '\033[0m'

#docker run --rm -v $(pwd):/source -w /source node:8-alpine npm run eslint
