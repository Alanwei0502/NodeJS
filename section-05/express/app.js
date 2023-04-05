const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use((req, res, next) => {
//   console.log('In the middleware!');
//   next(); // 允許 request 進入到下一個 middleware function
// });

// app.use('/',(req, res, next) => {
//   console.log('This always runs!');
//   next();
// });

// add body-parser at first middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// const server = http.createServer(app);
// server.listen(3000);
// 可以省略成
app.listen(3000);
