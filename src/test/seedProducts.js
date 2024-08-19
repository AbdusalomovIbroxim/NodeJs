const { sequelize, DataTypes } = require('../config/db.config');
const path = require('path');
const fs = require('fs');
const Product = require('../models/productModel'); // Путь к вашей модели продукта
const ProductImage = require('../models/imageModel'); // Путь к вашей модели изображения продуктов


async function seedProducts() {
    try {
        // Проверка соединения
        console.log('Connection has been established successfully.');

        // Создание тестовых продуктов
        const products = Array.from({ length: 100 }, (_, index) => ({
            name: `Product ${index + 1}`,
            price: (Math.random() * 100).toFixed(2),
            description: `Description for product ${index + 1}`,
            slug: `product-${index + 1}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Добавление продуктов в базу данных
        await Product.bulkCreate(products);

        console.log('100 test products and their images have been added to the database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        console.log('Finished');
    }
}

seedProducts();