const { sequelize, DataTypes } = require('../config/db.config');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

const User = require('./userModel'); // Подключаем модель пользователя

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
}, {
  hooks: {
    beforeCreate: (product) => {
      if (!product.slug) {
        product.slug = slugify(product.name + '-' + uuidv4(), { lower: true });
      }
    },
  },
  timestamps: true,
  underscored: true
});

const ProductImage = require('./imageModel');

Product.prototype.addProductImages = async function (images) {
  // Создаем массив для хранения всех изображений
  const imageEntries = images.map(image => ({
    url: image.url,
    productId: this.id,
  }));
  
  // Сохраняем все изображения в базе данных
  await ProductImage.bulkCreate(imageEntries);
};


module.exports = Product;
