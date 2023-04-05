const express = require('express');
const path = require('path');
const router = express.Router();

// '/admin/add-product' => GET
router.get('/add-product',(req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// '/admin/add-product' => POST
router.post('/add-product',(req, res, next) => {
  console.log(req.body);
  res.status(302).redirect('/');
});

module.exports = router;
