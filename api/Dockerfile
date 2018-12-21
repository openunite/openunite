FROM node:10.13-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD npm start
