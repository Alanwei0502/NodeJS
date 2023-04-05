const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.status(200).render('admin/add-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  })
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.status(302).redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('admin/products', { 
      products, 
      path: '/admin/products',
      pageTitle: 'Admin Products',
    });
  });
}