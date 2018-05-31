#!/usr/bin/env bash

#List the aws command version
aws --version

#List the shush command version
/usr/local/bin/shush --help

stag_db_username=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQHGzjCskPBIDlhA0fm6pKpaAAAAZzBlBgkqhkiG9w0BBwagWDBWAgEAMFEGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM15q5JLHLmsOsXYcDAgEQgCSNvPFNJ4yEcGurWbJWTFEUgDWrQVur2H1vned5HT7CgcrhBBg=
stag_db_password=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQFqfZPmju9cXqMxcHHPHj8JAAAAazBpBgkqhkiG9w0BBwagXDBaAgEAMFUGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMHG3y3F+VKoa6w8T5AgEQgCgd78Eby3kCh6gutrBKrt9HE+g9Ahhk/NOm3QG4IGBtnOniS5SYwN7k

prod_db_username=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQEbLDiaqFY6tcAe8+SD2U0rAAAAZjBkBgkqhkiG9w0BBwagVzBVAgEAMFAGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM86kPcocEAqfGKnChAgEQgCMX1vJ/3eN/h2Amoo0VVjY4n1ikHVS8Odq/Tyy7NOGiEjpdjQ==
prod_db_password=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQH4sZZ/LmQ6y/FNtAwXeYjsAAAAcDBuBgkqhkiG9w0BBwagYTBfAgEAMFoGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMz/K5JIqkHa2G43Q0AgEQgC2DJoS75UzbUv1e0yfISTZY0CLwDwM3Bkwy3m/Z/xYHqv3/8qE6h1fXHGpycHw=

db_database=AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQHwV2l19YL1zZl9V/Qe7vn1AAAAZTBjBgkqhkiG9w0BBwagVjBUAgEAME8GCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM+EIOZ4cFhCirfoQ8AgEQgCJjI4y71LH/jMGBqbLghFNCIs5Z8syupvpRHHrIq/AX1BW6

###   Application will start from here
if [ "${RUNTIME}" == "server" ];
  then
    cp -pv /usr/src/app/src/config/example.connection.js /usr/src/app/src/config/connection.js
    configuration_file=/usr/src/app/src/config/connection.js
    echo -e "RUNTIME---${RUNTIME}--${REGION}   For infra code \n\n"
    export STAG_DB_USERNAME=$(/usr/local/bin/shush --region $REGION decrypt ${stag_db_username})
    export STAG_DB_PASSWORD=$(/usr/local/bin/shush --region $REGION decrypt ${stag_db_password})

    export PROD_DB_USERNAME=$(/usr/local/bin/shush --region $REGION decrypt ${prod_db_username})
    export PROD_DB_PASSWORD=$(/usr/local/bin/shush --region $REGION decrypt ${prod_db_password})

    export DB_DATABASE=$(/usr/local/bin/shush --region $REGION decrypt ${db_database})
    export NEW_RELIC_LICENSE_KEY=$(/usr/local/bin/shush --region $REGION decrypt ${NEWRELIC_KEY})

    /bin/sed -i "s|STAG_DB_USERNAME|${STAG_DB_USERNAME}|g"  ${configuration_file}    #   File for credential
    /bin/sed -i "s|STAG_DB_PASSWORD|${STAG_DB_PASSWORD}|g"  ${configuration_file}    #   File for credential

    /bin/sed -i "s|PROD_DB_USERNAME|${PROD_DB_USERNAME}|g"  ${configuration_file}    #   File for credential
    /bin/sed -i "s|PROD_DB_PASSWORD|${PROD_DB_PASSWORD}|g"  ${configuration_file}    #   File for credential

    /bin/sed -i "s|DB_DATABASE|${DB_DATABASE}|g"   ${configuration_file}     #   File for credential
else
  echo  "Let them develop first "
fi

echo ${REGION}
