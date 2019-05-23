FROM node:lts-alpine
WORKDIR /room-temp
COPY package.json /room-temp
RUN npm install
COPY . /room-temp
CMD node src/index.js

