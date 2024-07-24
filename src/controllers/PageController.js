const Product = require('../models/productModel');
const ProductImage = require('../models/imageModel');

// src/controllers/PageController.js
class PageController {
        async getHomePage(req, res) {
            try {
                const products = await Product.findAll({
                    order: [['createdAt', 'DESC']], // Сортировка по дате создания
                    limit: 15,
                    include: {
                        model: ProductImage,
                        as: 'images',
                        attributes: ['url'],
                        limit: 1 // Загружаем только одно изображение для каждого продукта
                    }
                });

                // Преобразование данных для отображения
                const formattedProducts = products.map(product => {
                    // Получаем первое изображение (если оно есть)
                    const image = product.images[0];
                    return {
                        ...product.toJSON(),
                        imageUrl: image ? image.url : 'https://via.placeholder.com/300' // Замените на URL по умолчанию, если изображения нет
                    };
                });

                res.render('homePage', { products: formattedProducts });
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
