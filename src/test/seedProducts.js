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

        // Добавление изображений к продуктам
        const imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']; // Пример изображений
        for (let i = 0; i < 100; i++) {
            const productId = i + 1; // ID продукта (предполагается, что автоинкрементированное поле id начинается с 1)
            const imageFile = imageFiles[i % imageFiles.length];
            const imagePath = path.join(__dirname, 'images', imageFile);

            // Проверка существования файла
            if (fs.existsSync(imagePath)) {
                await ProductImage.create({
                    productId: productId,
                    url: `/images/products/${imageFile}`,
                    altText: `Image ${imageFile}`,
                });
            }
        }

        console.log('100 test products and their images have been added to the database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        // Закрытие соединения
        console.log('Finished');
    }
}

seedProducts();
