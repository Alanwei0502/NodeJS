const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

// 定義一個叫做 product 的資料結構
const Product = sequelize.define('product', {
  id: {
    // 欄位名稱
    type: Sequelize.INTEGER, // 資料型態
    autoIncrement: true,
    allowNull: false, // 預設是 true
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
