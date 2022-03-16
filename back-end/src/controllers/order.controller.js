const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { orderService, orderItemService } = require('../services');
const response = require('../utils/responseTemp');
const pick = require('../utils/pick');

/**
 * Create an oreder
 */
const createOrder = catchAsync(async (req, res) => {
  const { itemArr, order: orderInfo } = req.body;
  const order = await orderService.createOrder(orderInfo);
  await orderItemService.createOrderItems(order.id, itemArr);
  const items = await orderItemService.getOrderItems(order.id);
  res.send(response(httpStatus.CREATED, 'New order created', { order, items }));
});

/**
 * Get my orders
 */
const getMyOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'isPaid']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const orders = await orderService.getMyOrders(filter, options, req.user.id);
  res.send(response(httpStatus.OK, 'success', { orders }));
});

/**
 * getOrderDetails
 */
const getOrderDetails = catchAsync(async (req, res) => {
  const order = await orderService.getOrderDetails(req.params.orderId);
  const items = await orderItemService.getOrderItems(req.params.orderId);
  res.send(response(httpStatus.OK, 'success', { order, items }));
});

/**
 * updateIsPaid
 */
const updateIsPaid = catchAsync(async (req, res) => {
  const order = await orderService.updateIsPaid(req.params.orderId);
  const items = await orderItemService.getOrderItems(req.params.orderId);
  res.send(response(httpStatus.OK, 'Order updated', { order, items }));
});

/**
 * updateOrder
 */
const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrder(req.params.orderId, req.body);
  const items = await orderItemService.getOrderItems(req.params.orderId);
  res.send(response(httpStatus.OK, 'Order updated', { order, items }));
});

/**
 * getOrders
 */
const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'shipping']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const orders = await orderService.getOrders(filter, options);
  res.send(response(httpStatus.OK, 'success', { orders }));
});
module.exports = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getOrders,
  updateIsPaid,
  updateOrder,
  updateOrder,
};
