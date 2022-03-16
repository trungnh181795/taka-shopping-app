const { DataTypes } = require('sequelize');
const sequelize = require('./configDB');
const logger = require('../config/logger');
const { Products, Users } = require('./index');

const Reviews = sequelize.define('Reviews', {
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

Products.hasMany(Reviews, { foreignKey: 'productId', as: 'reviews' });
Reviews.belongsTo(Products, { foreignKey: 'productId', targetKey: 'id', as: 'reviews' });

Users.hasMany(Reviews, { foreignKey: 'userId' });
Reviews.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id', as: 'userReview' });

// create database table with name 'Reviews'
sequelize
  .sync()
  .then(() => logger.info('Sync Reviews Table success!'))
  .catch(() => logger.error('Sync Reviews Table fail'));

module.exports = Reviews;
