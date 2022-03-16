const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services');
const response = require('../utils/responseTemp');
const pick = require('../utils/pick');

/**
 * Get products based on a user provided keyword
 */

const getProductsByKeyword = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const products = await searchService.getProductsByKeyword(filter, options);
  res.send(response(httpStatus.OK, 'success', { products }));
});

module.exports = {
  getProductsByKeyword,
};
