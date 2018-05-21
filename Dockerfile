FROM node:8

#Install Updates
RUN apt-get update -y

# shush for encrpyt and decrypyt
RUN curl -sL -o /usr/local/bin/shush \
    https://github.com/realestate-com-au/shush/releases/download/v1.3.0/shush_linux_amd64 \
    && chmod +x /usr/local/bin/shush

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json /tmp/

# Install app dependencies
RUN cd /tmp && npm install && npm install -g pm2
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app


#Re-compile all the JS files
RUN npm run build
EXPOSE 9000

ENV NODE_ENV stag
ENV NODE_ICU_DATA=./node_modules/full-icu

CMD ["sh", "-c", "pm2-docker start process.yml"]
