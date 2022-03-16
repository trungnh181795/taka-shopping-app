const Joi = require('joi');
const { numberPhone } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    order: Joi.object().keys({
      totalPrice: Joi.number().required(),
      address: Joi.string().required(),
      contact: Joi.string().optional().custom(numberPhone),
      paymentMethod: Joi.string().required(),
      userId: Joi.number().optional(),
    }),
    itemArr: Joi.array().items(
      Joi.object().keys({
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        total: Joi.number().required(),
      })
    ),
  }),
};

const getMyOrders = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};
const getOrderDetails = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};
const updateIsPaid = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};
const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string(),
    isPaid: Joi.boolean(),
  }),
};
const getOrders = {
  query: Joi.object().keys({
    status: Joi.string(),
    isPaid: Joi.boolean(),
    sortBy: Joi.string(),
    order: Joi.string(),
    size: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getOrders,
  updateIsPaid,
  updateOrder,
};
