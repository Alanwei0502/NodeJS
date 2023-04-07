const mysql = require('mysql2');

// 連接池通過重用以前的連接來幫助減少連接到 MySQL 服務器所花費的時間，當你完成它們時讓它們保持打開而不是關閉。
// 這改善了查詢的延遲，因為您避免了建立新連接所帶來的所有開銷。
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'mysql5275',
});

module.exports = pool.promise();