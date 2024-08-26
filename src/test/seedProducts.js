const { sequelize, DataTypes } = require('../config/db.config');
const path = require('path');
const fs = require('fs');
const Product = require('../models/productModel');
const ProductImage = require('../models/imageModel');


async function seedProducts() {
    try {
        console.log('Connection has been established successfully.');

        const products = Array.from({ length: 100 }, (_, index) => ({
            name: `Product ${index + 1}`,
            price: (Math.random() * 100).toFixed(2),
            description: `Description for product ${index + 1}`,
            slug: `product-${index + 1}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        await Product.bulkCreate(products);

        console.log('100 test products and their images have been added to the database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        console.log('Finished');
    }
}

seedProducts();