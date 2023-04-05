const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/index', { 
      products, 
      path: '/',
      pageTitle: 'Shop',
    });
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/product-list', { 
      products, 
      path: '/products',
      pageTitle: 'All Products',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.status(200).render('shop/cart', { 
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

exports.getOrders = (req, res, next) => {
  res.status(200).render('shop/orders', { 
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/checkout', { 
      path: '/checkout',
      pageTitle: 'Checkout',
    });
  });
};