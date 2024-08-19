const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Защищенный маршрут
// router.get('/profile', authenticateToken, UserController.getUserProfile);
router.get('/me', authMiddleware, UserController.getUserProfile);
router.get('/profile', (req, res) => {
    res.render('user/userProfile');    
})

module.exports = router;
