FROM node

RUN npm i -g @quasar/cli

WORKDIR /app

COPY . /app

EXPOSE 8080
CMD ["quasar", "dev"]