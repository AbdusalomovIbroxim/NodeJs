const sequelize = require('../config/db.config');

const Product = require('./productModel');
const ProductImage = require('./imageModel');
const User = require('./userModel');


User.sync();
ProductImage.sync();
Product.sync();

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', 'as': 'product' });

module.exports = {
  sequelize,
  User,
  Product,
  ProductImage,
};
