const http = require('http');
const Sequelize = require('sequelize');
const configDB = {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
  database: 'test'
};

const server = http.createServer((req, res) => {
  const sequelize = new Sequelize('postgresql://postgres:123456@postgres:5432/test');
  sequelize
    .authenticate()
    .then(() => {
      console.log('connection has been established successfully');
    })
    .catch((err) => {
      console.log('paila pana', err.message);
    });

  res.write('Hello world...');
  res.end();

});

server.listen(4000, () => {
  console.log("server listen for port 4000 :3");
});


