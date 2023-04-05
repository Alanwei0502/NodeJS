const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/',(req, res, next) => {
  // 預設的 response header 就是 text/html
  res.status(200).sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;