const { sequelize, DataTypes } = require('../config/db.config');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Включает поля createdAt и updatedAt
  tableName: 'Users', // Убедитесь, что это название таблицы
});

module.exports = User;
