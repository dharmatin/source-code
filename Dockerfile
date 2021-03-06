FROM node:8

#Install Updates
RUN apt-get update -q

#Install net-tools
RUN apt-get install -qy  python-pip  python-dev
RUN pip install awscli

RUN curl -sL -o /usr/local/bin/shush \
    https://github.com/realestate-com-au/shush/releases/download/v1.3.4/shush_linux_amd64 \
    && chmod +x /usr/local/bin/shush

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json /tmp/

# Install app dependencies
RUN cd /tmp && npm install && npm install -g pm2
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

ARG REGION=ap-southeast-1
ARG RUNTIME=server

ENV NEWRELIC_KEY AQICAHj1keVeoA9wgQiW1BgXe6UsTUpVjgI7V6Mt9byC0bH+PQGTngzwJufitleBeVQPKwzxAAAAhzCBhAYJKoZIhvcNAQcGoHcwdQIBADBwBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDNatzBwqvri+exxUVQIBEIBDisZhk0sB+yWgpjzkswgMoLJw0dnlunGinvGQwDkMUCEOmCtcRnGp2US4sMMPQ+Jc4w4TWtMmuKJ5sh5N6ykEQKv4HQ==
ENV NODE_ENV stag
ENV NODE_ICU_DATA=./node_modules/full-icu


COPY scripts/entrypoint.sh /scripts/entrypoint.sh
RUN chmod +x /scripts/entrypoint.sh
RUN /scripts/entrypoint.sh


#Re-compile all the JS files
RUN npm run build
EXPOSE 9000

CMD ["sh", "-c", "pm2-docker start process.yml"]
