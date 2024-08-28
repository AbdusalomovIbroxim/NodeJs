// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const sendDataControllers = require('../controllers/sendDataController');

router.post('/add-product', authMiddleware, upload.array('dropImage'), ProductController.addProduct);

router.get('/add-product', ProductController.getAddProductPage);
router.get('/product-list', ProductController.getAllProducts);
router.get('/product/:slug', ProductController.getProductDetail);

router.get('/products', ProductController.getAllProducts);

router.get('/update-product-page', ProductController.updateProductPage);
router.post('/update-product-page/:slug', authMiddleware, upload.array('dropImage'), ProductController.updateProduct);

router.delete('/products/delete', ProductController.deleteProduct);

router.get('/get-categories', sendDataControllers.getCategories);

module.exports = router;
