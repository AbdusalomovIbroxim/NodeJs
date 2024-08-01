// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const urls = require('../config/urls')
const authenticateToken = require('../middleware/authMiddleware')

// Render registration page
router.get('/register', (req, res) => {
    res.render('auth/register', urls);
});

// Render login page
router.get('/login', (req, res) => {
    res.render('auth/login', urls);
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


router.get('/auth', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'User is authorized', user: req.user });
});



module.exports = router;
