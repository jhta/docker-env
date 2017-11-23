FROM node

WORKDIR /src
COPY ./app /src/app

ADD app/package.json /src/package.json

RUN npm i -g nodemon
RUN npm install

EXPOSE 4000
CMD npm start
