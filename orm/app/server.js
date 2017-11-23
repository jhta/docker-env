const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello world');
  res.end();

});

server.listen(4000, () => {
  console.log("server listen for port 4000 :D");
});


