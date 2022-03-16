const { DataTypes } = require('sequelize');
const sequelize = require('./configDB');
const { Orders, Products } = require('./index');

const logger = require('../config/logger');

const OrderItems = sequelize.define('OrderItems', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Products.hasMany(OrderItems, { foreignKey: 'productId', as: 'itemInfo' });
OrderItems.belongsTo(Products, { foreignKey: 'productId', as: 'itemInfo', targetKey: 'id' });
Orders.hasMany(OrderItems, { foreignKey: 'orderId' });
OrderItems.belongsTo(Orders, { foreignKey: 'orderId', targetKey: 'id' });

sequelize
  .sync({ alter: true })
  .then(() => logger.info('Sync Order Items Table success!'))
  .catch(() => logger.error('Sync Order Items Table fail'));

module.exports = OrderItems;
