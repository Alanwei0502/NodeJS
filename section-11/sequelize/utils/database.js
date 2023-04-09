const Sequelize = require('sequelize');

// 連線資料庫
// new Sequelize('database', 'username', 'password', options);
const sequelize = new Sequelize('node-complete', 'root', 'mysql5275', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
