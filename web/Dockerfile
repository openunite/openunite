FROM node:10.13-alpine as builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN npm run build

FROM nginx:1.15-alpine 
COPY --from=builder /app/build /usr/share/nginx/html/
