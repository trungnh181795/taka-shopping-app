const { DataTypes } = require('sequelize');
const sequelize = require('./configDB');
const logger = require('../config/logger');

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  brand: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  numOfReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  countInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

// create database table with name 'Products'
sequelize
  .sync({ alter: true })
  .then(() => logger.info('Sync Products Table success!'))
  .catch(() => logger.error('Sync Products Table fail'));

module.exports = Products;
