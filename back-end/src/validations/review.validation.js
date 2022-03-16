const Joi = require('joi');

const createReview = {
  params: Joi.object().keys({
    productId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    productId: Joi.number().required(),
    userId: Joi.number().required(),
    rating: Joi.number().required(),
    content: Joi.string().required(),
  }),
};

const getReviews = {
  params: Joi.object().keys({
    productId: Joi.number().required(),
  }),
};

module.exports = {
  createReview,
  getReviews,
};
