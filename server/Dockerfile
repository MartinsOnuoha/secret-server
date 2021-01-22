FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for Secret Server backend API."
LABEL maintainer = ["martinsvictor.nd@gmail.com"]

# Dockerize is needed to sync containers startup
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN ls
RUN yarn
# RUN yarn test:server

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
