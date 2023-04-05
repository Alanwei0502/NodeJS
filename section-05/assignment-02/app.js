const express = require('express');

const app = express();

// 2
// app.use('/', (req, res, next) => {
//   console.log('In the first middleware');
//   next();
// });

// app.use('/', (req, res, next) => {
//   console.log('In the second middleware');
//   res.send(`
//     <h1>Welcome to my assignment page.</h1>
//   `);
// });

app.use('/users', (req, res, next) => {
  res.send(`
    <ul>
      <li>User 1</li>
      <li>User 2</li>
      <li>User 3</li>
    </ul>
  `);
});

app.use('/', (req, res, next) => {
  console.log('In the second middleware');
  res.send(`
    <h1>Welcome to my assignment page.</h1>
  `);
});

app.listen(3000);