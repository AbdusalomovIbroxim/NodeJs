const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminMiddleware');

// Открытие панели администратора
router.get('/', adminController.openAdminPanel);

// Применение middleware для авторизации и проверки админа
router.use(authMiddleware, checkAdmin);

// Получение всех заказов
router.get('/get-all-orders', adminController.getAllOrders);

// Создание и получение категорий
router.post('/categories', adminController.createCategory);
router.get('/categories', adminController.createCategory);  // Assuming this is for fetching categories

// Управление продуктами
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);

// Получение пользователей
router.get('/get-users', adminController.getUsers);

// Обновление статуса пользователя
router.post('/users', adminController.updateUserStatus);

module.exports = router;
