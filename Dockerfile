FROM node:latest

WORKDIR /front

RUN apt update -y && apt upgrade -y

RUN yarn global add  npm-check-updates


ENV HOST 0.0.0.0
