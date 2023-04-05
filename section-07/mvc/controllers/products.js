const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.status(200).render('add-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  })
};

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.status(302).redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop', { 
      products, 
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};