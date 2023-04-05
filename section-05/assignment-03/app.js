const express = require('express');
const path = require('path');

const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const indexRoutes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(userRoutes);
app.use(cartRoutes);
app.use(indexRoutes)

app.listen(3000);