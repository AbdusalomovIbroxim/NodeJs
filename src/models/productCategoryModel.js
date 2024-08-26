// src/models/productCategoryModel.js
const { sequelize, DataTypes } = require('../config/db.config');

const ProductCategory = sequelize.define('ProductCategory', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', // Название таблицы продуктов
      key: 'id'
    },
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', // Название таблицы категорий
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true

});

module.exports = ProductCategory;
