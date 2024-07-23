const sequelize = require('../config/db.config');

const Product = require('./productModel');
const Image = require('./imageModel');
const User = require('./userModel');




User.sync();




module.exports = {
  sequelize,
  User,
  Product,
  Image,
};
