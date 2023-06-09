const db = require('../utils/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(title, imageUrl, price, description, id) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)', // avoid SQL injection
      [this.title, this.imageUrl, this.price, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
