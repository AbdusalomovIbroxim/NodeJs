const express = require('express');
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get-cart', authMiddleware, CartController.viewCart);
router.post('/cart/add', authMiddleware, CartController.addProductToCart);
router.post('/cart/remove', authMiddleware, CartController.removeProductFromCart);
router.post('/cart/order', authMiddleware, CartController.placeOrder);


router.get('/cart', (req, res) => {
    res.render('product/Cart');
});


module.exports = router;
