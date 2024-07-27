const sequelize = require('../config/db.config');

const User = require('./userModel');
const Product = require('./productModel');
const ProductImage = require('./imageModel');
const Category = require('./categoryModel');


User.sync();
ProductImage.sync();
Product.sync();
Category.sync();

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', 'as': 'product' });

module.exports = {
  sequelize,
  User,
  Product,
  ProductImage,
};
