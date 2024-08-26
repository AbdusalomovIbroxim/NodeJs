const sequelize = require('../config/db.config');

const User = require('./userModel');
const Product = require('./productModel');
const ProductImage = require('./imageModel');
const Category = require('./categoryModel');
const ProductCategory = require('./productCategoryModel');
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const Orders = require('../models/ordersModel');
const OrderItem = require('../models/orederItemModel');



// Cart.sync({force: true});
// Orders.sync({force: true});
// User.sync({force: true});
// Product.sync({force: true});
// Category.sync({force: true});
// ProductCategory.sync({force: true});
// ProductImage.sync({force: true});
// CartItem.sync({force: true});
// OrderItem.sync({force: true});


User.sync();
Product.sync();
Category.sync();
ProductCategory.sync();
ProductImage.sync();
Cart.sync();
CartItem.sync();
Orders.sync();
OrderItem.sync();


Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'productId' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'categoryId' });


Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });

Orders.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Orders, { foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });


module.exports = {
  sequelize,
  User,
  Product,
  ProductImage,
  Category,
  ProductCategory,
  Cart,
  CartItem,
  Orders,
  OrderItem,
};


