const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

// [ADD]
router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

// [EDIT]
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

// [DELETE]
router.post('/delete-product', adminController.postDeleteProduct);

// [FETCH]
router.get('/products', adminController.getProducts);

module.exports = router;