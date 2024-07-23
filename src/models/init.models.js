const sequelize = require('../config/db.config');

// const User = require('./userModel')(sequelize, Sequelize);
// const Product = require('./productModel')(sequelize, Sequelize);
// const Image = require('./imageModel')(sequelize, Sequelize);


const Product = require('./productModel');
const Image = require('./imageModel');
const User = require('./userModel');

Product.sync();
Image.sync();
User.sync();

// Установить связи между моделями
Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Product,
  Image,
};
