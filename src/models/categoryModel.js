const { sequelize, DataTypes } = require('../config/db.config');

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,}, 
    name: { type: DataTypes.STRING, allowNull: false}}, 
    {
        timestamps: false,
        underscored: true
});

module.exports = Category;
