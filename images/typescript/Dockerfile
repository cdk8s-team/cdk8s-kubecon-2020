FROM node:14

RUN mkdir /app
WORKDIR /app

ADD package.json /app
RUN yarn

ADD . /app

ENV PORT=8080
EXPOSE $PORT

CMD [ "npx", "ts-node", "index.ts" ]
