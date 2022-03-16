const httpStatus = require('http-status');
const { Orders } = require('../models');
const ApiError = require('../utils/ApiError');
const paginationService = require('./pagination.service');

/**
 * Create an order
 * @param {Object} order object
 * @returns {Promise<order>}
 */
const createOrder = (body) => {
  return Orders.create(body);
};

/**
 * Update isPaid
 * @param {String} orderId
 * @returns {Promise<User>}
 */
const updateIsPaid = async (orderId) => {
  const order = await Orders.findByPk(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.save();

  return order;
};

/**
 * Get all orders of a user
 * @param {Object,Object,String} filter, options, userId
 * @returns {Promise<Order>}
 */
const getMyOrders = async (filter, options, userId) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);
  if (!options.sortBy) options.sortBy = 'createdAt';
  if (!options.order) options.order = 'desc';
  const data = await Orders.findAndCountAll({
    where: { ...filter, userId },
    limit,
    offset,
    order: [[options.sortBy, options.order]],
  });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders Found');
  }

  return paginationService.getPagingData(data, page, limit);
};

/**
 * Create an user
 * @param {String} orderId
 * @returns {Promise<Order>}
 */
const getOrderDetails = async (orderId) => {
  const order = await Orders.findByPk(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  return order;
};

/**
 * Admin updates orders
 * @param {String,Object} orderId, order object
 * @returns {Promise<Order>}
 */
const updateOrder = async (orderId, body) => {
  const order = await Orders.findByPk(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (body.isPaid) {
    body.paidAt = Date.now();
  } else {
    body.paidAt = null;
  }
  Object.assign(order, body);
  order.save();
  return order;
};

/**
 * admin fetches all orders
 * @param {Object,Object} filter, options
 * @returns {Promise<Orders>}
 */
const getOrders = async (filter, options) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);
  if (!options.sortBy) options.sortBy = 'createdAt';
  if (!options.order) options.order = 'desc';
  const data = await Orders.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [[options.sortBy, options.order]],
  });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders Found');
  }

  return paginationService.getPagingData(data, page, limit);
};

module.exports = {
  createOrder,
  updateIsPaid,
  getMyOrders,
  getOrderDetails,
  getOrders,
  updateOrder,
};
