// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/profile', authenticateToken, UserController.getUserProfile);

module.exports = router;
