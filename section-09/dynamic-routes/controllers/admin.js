const Product = require('../models/product');

// [ADD]
exports.getAddProduct = (req, res, next) => {
  res.status(200).render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  })
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.status(302).redirect('/');
};

// [EDIT]
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.status(302).redirect('/');
  }

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if(!product){
      res.status(302).redirect('/');
    }
    res.status(200).render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  const updatedProduct = new Product(
    title, 
    imageUrl,
    price, 
    description, 
    productId
  );
  updatedProduct.save();
  res.status(302).redirect('/admin/products');
};


// [DELETE]
exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.status(302).redirect('/admin/products');
};

// [FETCH]
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('admin/products', { 
      products, 
      path: '/admin/products',
      pageTitle: 'Admin Products',
    });
  });
};