FROM node:8-alpine

COPY . /source
WORKDIR /source
EXPOSE 9000

RUN npm install && npm install -g pm2
RUN npm run build

CMD ["pm2-docker", "start", "process.yml"]
