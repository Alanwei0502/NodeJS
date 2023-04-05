// 引入http模組
const http = require('http');

// 引入路由函數
const routes = require('./routes');

console.log(routes.someText);

// 創建伺服器
const server = http.createServer(routes.handler);

// 伺服器port設定
server.listen(3000);