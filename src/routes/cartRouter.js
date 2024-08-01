const express = require('express');
const CartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authMiddleware'); // Предполагается, что вы используете middleware для аутентификации

const router = express.Router();

router.get('/get-cart', authenticateToken, CartController.getCart);
router.post('/cart/add', authenticateToken, CartController.addProductToCart);
router.post('/cart/remove', authenticateToken, CartController.removeProductFromCart);
router.post('/cart/order', authenticateToken, CartController.placeOrder); // Новый маршрут для размещения заказа


router.get('/cart', (req, res) => {
    res.render('product/Cart');
});


module.exports = router;
