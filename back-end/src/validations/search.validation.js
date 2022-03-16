const Joi = require('joi');

const getProductsByKeyword = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    order: Joi.string(),
    size: Joi.number().integer(),
    page: Joi.number().integer(),
    keyword: Joi.string(),
  }),
};

module.exports = {
  getProductsByKeyword,
};
