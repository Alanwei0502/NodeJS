const fs = require('fs');
const path = require('path');

const p = path.join(
  __dirname, 
  '..', 
  'data', 
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice){
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err){
        cart = JSON.parse(fileContent);
      }
      // analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(product => product.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // add new product or increase the quantity
      let updatedProduct;
      if(existingProduct){
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [ ...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else{
        updatedProduct = { id, qty: 1 };
        cart.products = [ ...cart.products, updatedProduct];
      }

      // increase the total price
      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice){
    fs.readFile(p, (err, fileContent) => {
      if(err){
        return;
      }
      const cart = JSON.parse(fileContent);
      const udpatedCart = { ...cart };
      const product = udpatedCart.products.find(p => p.id === id);
      if(!product){
        return;
      }
      const productQty = product.qty;
      udpatedCart.products = udpatedCart.products.filter(p => p.id !== id);
      udpatedCart.totalPrice = cart.totalPrice -  productPrice * productQty;

      fs.writeFile(p, JSON.stringify(udpatedCart), (err) => {
        console.log(err);
      });
    })
  }

  static getProducts (cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err){
        cb(null);
      }else{
        cb(cart);
      }
    });
  }
}