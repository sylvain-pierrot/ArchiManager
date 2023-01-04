FROM node as builder

RUN npm i -g @quasar/cli

COPY . /app
WORKDIR /app

RUN npm ci
RUN quasar build


FROM nginx:stable-alpine as runner

COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf
