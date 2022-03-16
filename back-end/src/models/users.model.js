const { DataTypes } = require('sequelize');
const now = require('moment');
const bcrypt = require('bcryptjs');
const sequelize = require('./configDB');
const logger = require('../config/logger');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
    validate: {
      isEmail: { msg: 'Must be a valid email address' },
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: 'Contact already in use!',
    },
    validate: {
      isMobilePhone: { msg: 'Must be a valid number phone' },
    },
    allowNull: true,
    defaultValue: null,
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'user',
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isContactVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // createdAt: DataTypes.DATE(now()),
  // updatedAt: DataTypes.DATE(now()),
});

Users.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 8);
});

Users.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if (user.changed('contact')) {
    user.isContactVerified = false;
  }
  if (user.changed('email')) {
    user.isEmailVerified = false;
  }
});

Users.isEmailTaken = async (_email) => {
  const user = await Users.findOne({ where: { email: _email } });
  return !!user;
};

Users.isContactTaken = async (_contact) => {
  const user = await Users.findOne({ where: { contact: _contact } });
  return !!user;
};

Users.prototype.checkPassword = async (password, truePassword) => {
  return bcrypt.compare(password, truePassword);
};

sequelize
  .sync({ alter: true })
  .then(() => logger.info('Sync Users Table success!'))
  .catch(() => logger.error('Sync Users Table fail')); // create database table with name 'Users'

module.exports = Users;
