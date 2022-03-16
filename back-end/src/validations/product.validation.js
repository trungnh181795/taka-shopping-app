const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    countInStock: Joi.number().optional(),
    rating: Joi.number().optional(),
    imageUrls: Joi.array().items(Joi.string()).required(),
  }),
};
const getProduct = {
  params: Joi.object().keys({
    productId: Joi.number().required(),
  }),
};
const getProducts = {
  query: Joi.object().keys({
    brand: Joi.string(),
    category: Joi.string(),
    sortBy: Joi.string(),
    order: Joi.string(),
    size: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      brand: Joi.string().optional(),
      category: Joi.string().optional(),
      price: Joi.number().optional(),
      description: Joi.string().optional(),
      countInStock: Joi.number().optional(),
      rating: Joi.number().optional(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.number().required(),
  }),
};
module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
};
