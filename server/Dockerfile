FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for Secret Server backend API."
LABEL maintainer = ["martinsvictor.nd@gmail.com"]

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN ls
RUN yarn
# RUN yarn test:server

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
