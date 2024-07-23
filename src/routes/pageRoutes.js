// src/routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const PageController = require('../controllers/PageController');

router.get('/', PageController.getHomePage);
router.get('/about-us', PageController.getAboutUsPage);
router.get('/contact', PageController.getContactPage);

module.exports = router;
