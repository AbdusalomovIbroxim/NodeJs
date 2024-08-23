const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware')
const checkAdmin = require('../middleware/adminMiddleware')


// Получение всех заказов
router.get('/', adminController.openAdminPanel);

router.get('/get-all-orders', authMiddleware, checkAdmin, adminController.getAllOrders);

// Создание категории
router.get('/categories', authMiddleware, checkAdmin, adminController.createCategory);
router.post('/categories', authMiddleware, checkAdmin, adminController.createCategory);

router.get('/get-users', authMiddleware, checkAdmin, adminController.getUsers);

router.post('/users', authMiddleware, checkAdmin, adminController.updateUserStatus);


router.get('/fnijaksdjdigadjfgadfijafgiajfg', adminController.meadmin)

module.exports = router;
