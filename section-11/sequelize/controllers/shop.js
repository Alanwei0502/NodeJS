const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).render('shop/index', {
        products,
        path: '/',
        pageTitle: 'Shop',
      });
    })
    .catch((err) => console.error(err));
};

// [PRODUCT]
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).render('shop/product-list', {
        products,
        path: '/products',
        pageTitle: 'All Products',
      });
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findAll({ where: { id: productId } })
    .then((products) => {
      res.status(200).render('shop/product-detail', {
        product: products[0],
        path: '/products',
        pageTitle: products[0].title,
      });
    })
    .catch((err) => console.error(err));
};

// [CART]
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.status(200).render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.status(302).redirect('/cart');
    })
    .catch((err) => console.error(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.status(302).redirect('/cart');
    })
    .catch((err) => console.error(err));
};

// [ORDER]
exports.postOrder = (req, res, next) => {
  let fetchCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = {
                quantity: product.cartItem.quantity,
              };
              return product;
            })
          );
        })
        .catch((err) => console.error(err));
    })
    .then((result) => {
      return fetchCart.setProducts(null);
    })
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.status(200).render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders,
      });
    })
    .catch((err) => console.error(err));
};
