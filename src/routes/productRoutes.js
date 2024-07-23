// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const ProductController = require('../controllers/productController');

router.get('/add-product', ProductController.getAddProductPage);
router.post('/add-product', upload.array('images'), ProductController.addProduct);
router.get('/product-list', ProductController.getAllProducts);
router.get('/product-details/:slug', ProductController.getProductDetail);

module.exports = router;
