FROM node:14

RUN mkdir /app
WORKDIR /app

# install deps before deploying the code
ADD package.json /app
RUN yarn

# add the code
ADD . /app

ENV PORT=8080
EXPOSE $PORT

CMD [ "npx", "ts-node", "index.ts" ]
