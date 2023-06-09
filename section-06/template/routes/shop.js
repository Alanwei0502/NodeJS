const express = require('express');
const path = require('path');
const router = express.Router();
const adminData = require('./admin');

router.get('/',(req, res, next) => {
  const products = adminData.products;
  res.status(200).render('shop', { 
    products, 
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;