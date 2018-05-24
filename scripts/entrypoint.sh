#!/usr/bin/env bash

#List the aws command version
aws --version

#List the shush command version
/usr/local/bin/shush --help

db_username=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQHGzjCskPBIDlhA0fm6pKpaAAAAZzBlBgkqhkiG9w0BBwagWDBWAgEAMFEGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM15q5JLHLmsOsXYcDAgEQgCSNvPFNJ4yEcGurWbJWTFEUgDWrQVur2H1vned5HT7CgcrhBBg=
db_password=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQFqfZPmju9cXqMxcHHPHj8JAAAAazBpBgkqhkiG9w0BBwagXDBaAgEAMFUGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMHG3y3F+VKoa6w8T5AgEQgCgd78Eby3kCh6gutrBKrt9HE+g9Ahhk/NOm3QG4IGBtnOniS5SYwN7k
db_database=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQHwV2l19YL1zZl9V/Qe7vn1AAAAZTBjBgkqhkiG9w0BBwagVjBUAgEAME8GCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM+EIOZ4cFhCirfoQ8AgEQgCJjI4y71LH/jMGBqbLghFNCIs5Z8syupvpRHHrIq/AX1BW6


###   Application will start from here
export DB_USER_NAME=$(/usr/local/bin/shush --region $REGION decrypt ${db_username})
export DB_PASSWORD=$(/usr/local/bin/shush --region $REGION decrypt ${db_password})
export DB_DATABASE=$(/usr/local/bin/shush --region $REGION decrypt ${db_database})
export NEW_RELIC_LICENSE_KEY=$(/usr/local/bin/shush --region $REGION decrypt ${NEWRELIC_KEY})

touch /tmp/sample-configuration-file.conf                                              #  For sample

/bin/sed -i "s|DB_USER_NAME|${DB_USER_NAME}|g" /tmp/sample-configuration-file.conf     #   File for credential
/bin/sed -i "s|DB_PASSWORD|${DB_PASSWORD}|g"   /tmp/sample-configuration-file.conf     #   File for credential
/bin/sed -i "s|DB_DATABASE|${DB_DATABASE}|g"   /tmp/sample-configuration-file.conf     #   File for credential

echo ${REGION}

