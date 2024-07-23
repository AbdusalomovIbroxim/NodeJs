const { sequelize, DataTypes } = require('../config/db.config');
const { v4: uuidv4 } = require('uuid');

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: 'Products', // Таблица продуктов
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = ProductImage;
