const sequelize = require('../config/db.config');

const User = require('./userModel');
const Product = require('./productModel');
const ProductImage = require('./imageModel');
const Category = require('./categoryModel');
const ProductCategory = require('./productCategoryModel');
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

User.sync();
ProductImage.sync();
Product.sync();
Category.sync();
ProductCategory.sync();
Cart.sync();
CartItem.sync();

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'productId' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'categoryId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });

module.exports = {
  sequelize,
  User,
  Product,
  ProductImage,
  Category,
  ProductCategory
};
