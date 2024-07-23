const { sequelize, DataTypes } = require('../config/db.config');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');

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
    allowNull: true, // allowNull can be true to accommodate automatic generation
  },
}, {
  hooks: {
    beforeCreate: (product) => {
      if (!product.slug) { // Only generate slug if it's not provided
        product.slug = slugify(product.name + '-' + uuidv4(), { lower: true });
      }
    },
  },
  timestamps: true,
});


const Image = require('./imageModel');

Image.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Image, { foreignKey: 'productId' });

Product.sync();

module.exports = Product;
