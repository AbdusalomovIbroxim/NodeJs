const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware')
const checkAdmin = require('../middleware/adminMiddleware')


// Получение всех заказов
router.get('/', adminController.openAdminPanel);

router.get('/get-all-orders', authMiddleware, adminController.getAllOrders);

// Создание категории
router.get('/categories', authMiddleware, adminController.createCategory);
router.post('/categories', authMiddleware, adminController.createCategory);

router.get('/get-users', authMiddleware, adminController.getUsers);

router.post('/users', authMiddleware, adminController.updateUserStatus);


router.get('/fnijaksdjdigadjfgadfijafgiajfg', adminController.meadmin)

module.exports = router;
