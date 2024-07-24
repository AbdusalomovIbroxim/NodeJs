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


const ProductImage = require('./imageModel');


Product.prototype.addProductImages = async function (images) {
  for (const image of images) {
    await ProductImage.create({
      url: image.url,
      // altText: image.altText,
      productId: this.id,
    });
  }
};

module.exports = Product;
