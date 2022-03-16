const { DataTypes } = require('sequelize');
const sequelize = require('./configDB');
const logger = require('../config/logger');
const { Products } = require('./index');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Products.hasMany(Media, { foreignKey: 'productId', as: 'images' });
Media.belongsTo(Products, { foreignKey: 'productId', targetKey: 'id', as: 'images' });

// create database table with name 'Media'
sequelize
  .sync({ alter: true })
  .then(() => logger.info('Sync Media Table success!'))
  .catch(() => logger.error('Sync Media Table fail'));

module.exports = Media;
