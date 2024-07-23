const Product = require('../models/productModel');

// src/controllers/PageController.js
class PageController {
    // Метод для главной страницы
    async getHomePage(req, res) {
        try {
            // Получаем последние 15 продуктов
            const products = await Product.findAll({
                order: [['createdAt', 'DESC']], // Сортировка по дате создания
                limit: 15
            });
            res.render('homePage', { products });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    // Метод для страницы "О нас"
    getAboutUsPage(req, res) {
        res.render('aboutUs');
    }

    // Метод для страницы "Контакты"
    getContactPage(req, res) {
        res.render('contact');
    }
}

module.exports = new PageController;
