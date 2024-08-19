// src/routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const PageController = require('../controllers/PageController');
const { sendContact } = require('../controllers/sendContactController');

router.get('/', PageController.getHomePage);
router.get('/about-us', PageController.getAboutUsPage);
router.get('/contact', PageController.getContactPage);
router.get('/faq', PageController.getFAQPage);

router.post('/faq', PageController.postFAQPage);


router.post('/send-message', sendContact);



module.exports = router;
