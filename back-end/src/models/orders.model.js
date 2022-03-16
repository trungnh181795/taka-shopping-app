const { DataTypes } = require('sequelize');
const sequelize = require('./configDB');
const { Users } = require('./index');
const logger = require('../config/logger');

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Processing',
  },
});

Users.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' });

sequelize
  .sync({ alter: true })
  .then(() => logger.info('Sync Order Table success!'))
  .catch(() => logger.error('Sync Order Table fail')); // create database table with name 'Tokens'

module.exports = Orders;
