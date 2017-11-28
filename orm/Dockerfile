FROM node

WORKDIR /src
COPY ./app/* /src/

ADD app/package.json /src/package.json

RUN npm i -g nodemon
RUN npm install

EXPOSE 4000
