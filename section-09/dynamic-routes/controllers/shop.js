const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/index', { 
      products, 
      path: '/',
      pageTitle: 'Shop',
    });
  });
}

// [PRODUCT]
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/product-list', { 
      products, 
      path: '/products',
      pageTitle: 'All Products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.status(200).render('shop/product-detail', {
      product,
      path: '/products',
      pageTitle: product.title,
    })
  })
}

// [CART]
exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        if(cartProductData){
          cartProducts.push({
            productData: product, 
            qty: cartProductData.qty
          });
        }
      }
      res.status(200).render('shop/cart', { 
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  })
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.status(302).redirect('/cart');
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.status(302).redirect('/cart');
  });
};

// [ORDER]
exports.getOrders = (req, res, next) => {
  res.status(200).render('shop/orders', { 
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

// [CHECKOUT]
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).render('shop/checkout', { 
      path: '/checkout',
      pageTitle: 'Checkout',
    });
  });
};