const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.requestHandler)

server.listen(3000);