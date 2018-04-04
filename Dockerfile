FROM node:8

#Install Updates
RUN apt-get update -y


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

CMD ["sh", "-c", "pm2-docker start process.yml --env ${NODE_ENV}"]
