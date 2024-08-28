// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const urls = require('../config/urls')
const authMiddleware = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminMiddleware');
const { ro } = require('@faker-js/faker');

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


router.get('/auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'User is authorized', user: req.user });
});

router.get('/isadmin', authMiddleware, checkAdmin, (req, res) => {
    res.status(200).json({ message: 'User is admin', user: req.user });
});

router.post('/new/admin', AuthController.newadmin);



module.exports = router;
