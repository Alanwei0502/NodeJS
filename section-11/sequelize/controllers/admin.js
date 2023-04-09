const Product = require('../models/product');

// [ADD]
exports.getAddProduct = (req, res, next) => {
  res.status(200).render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({ title, imageUrl, price, description })
    .then(() => {
      console.log('CRETED PRODUCT!');
      res.status(302).redirect('/');
    })
    .catch((err) => console.error(err));
};

// [EDIT]
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) res.status(302).redirect('/');

  const { productId } = req.params;

  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      if (!product) res.status(302).redirect('/');

      res.status(200).render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  Product.update(
    { title, price, imageUrl, description },
    {
      where: {
        id: productId,
      },
    }
  )
    .then(() => {
      console.log('UPDATED PRODUCT!');
      res.status(302).redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};

// [FETCH]
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.status(200).render('admin/products', {
        products,
        path: '/admin/products',
        pageTitle: 'Admin Products',
      });
    })
    .catch((err) => console.error(err));
};

// [DELETE]
exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then(() => {
      console.log('DESTROYED PRODUCT!');
      res.status(302).redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};
