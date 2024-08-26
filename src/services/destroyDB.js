const CartItem = require('../models/cartItemModel');
const Orders = require('../models/ordersModel');
const OrderItem = require('../models/orederItemModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const ProductCategory = require('../models/productCategoryModel');
const ProductImage = require('../models/imageModel');
const User = require('../models/userModel');


async function clearTables() {
    await CartItem.destroy({ where: {}, truncate: true, restartIdentity: true });
    await Orders.destroy({ where: {}, truncate: true, restartIdentity: true });
    await OrderItem.destroy({ where: {}, truncate: true, restartIdentity: true });
    await Cart.destroy({ where: {}, truncate: true, restartIdentity: true });
    await Product.destroy({ where: {}, truncate: true, restartIdentity: true });
    await Category.destroy({ where: {}, truncate: true, restartIdentity: true });
    await ProductCategory.destroy({ where: {}, truncate: true, restartIdentity: true });
    await ProductImage.destroy({ where: {}, truncate: true, restartIdentity: true });
    await User.destroy({ where: {}, truncate: true, restartIdentity: true });
}
  clearTables()
    .then(() => {
      console.log('Все таблицы очищены');
    })
    .catch(err => {
      console.error('Ошибка при очистке таблиц:', err);
    });
  

module.exports = clearTables;