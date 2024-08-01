const Category = require('../models/categoryModel');
const urls = require('../config/urls');
const { useInflection } = require('sequelize');




class SendDataController {
    async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).send('Internal Server Error');
        }
    }


}

module.exports = new SendDataController;
