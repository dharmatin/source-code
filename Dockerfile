FROM node:8-alpine

COPY . /source
WORKDIR /source
EXPOSE 9000

RUN npm install && npm install -g pm2
RUN npm run build

ENV NODE_ENV stag

CMD ["sh", "-c", "pm2-docker start process.yml --env ${NODE_ENV}"]
