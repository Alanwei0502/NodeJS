const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// [middleware]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// check user in every request
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.error(err));
});

// [controller & routes]
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// [connect db & create table]
// 一對多
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

// 一對一
User.hasOne(Cart);
Cart.belongsTo(User);

// 多對多
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// 一對多
User.hasMany(Order);
Order.belongsTo(User);

// 多對多
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Alan', email: 'tset@test.com' });
    }
    return user;
  })
  // .then((user) => {
  //   user.createCart();
  // })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
