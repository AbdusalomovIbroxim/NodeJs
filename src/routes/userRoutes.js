// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const userController = new UserController();

router.get('/profile/:id', userController.getUserProfile.bind(userController));

module.exports = router;
