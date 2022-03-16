const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const response = require('../utils/responseTemp');
const { Reviews, Users } = require('../models');

//1. Create product
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.send(response(httpStatus.CREATED, 'Create Product Success', { product }));
});

//2. get products
const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'brand', 'category']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const products = await productService.queryProducts(filter, options, res);
  res.send(response(httpStatus.OK, 'Get All Products Success', products));
});

//3. Get product by id
const getProduct = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['rating']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const product = await productService.getProductByPk(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const reviews = await productService.getAllReviewByProductId(filter, options, req.params.productId);
  res.send(response(httpStatus.OK, 'Get Product Success', { product, reviews }));
});

//4. Update product
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductByPk(req.params.productId, req.body);
  res.send(response(httpStatus.OK, 'Update product success', product));
});

//5. Delete product by id
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductByPk(req.params.productId);
  res.send(response(httpStatus.OK, 'Delete product success'));
});

//6. Get reviews by productId
// const getOwnReviews = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['rating']);
//   const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);

//   const product = await productService.getProductByPk(req.params.productId);
//   if (!product) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
//   }

//   const reviews = await productService.getAllReviewByProductId(filter, options, req.params.productId);

//   res.send(response(httpStatus.OK, 'Get reviews success', reviews));
// });

//7. Create review for product
const createProductReview = catchAsync(async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User with this ID not found');
  }
  await productService.createProductReview(req.params.productId, req.body);
  const data = await Reviews.findOne({
    where: [{ userId: req.body.userId }, { productId: req.params.productId }],
    include: [
      {
        model: Users,
        as: 'userReview',
        attributes: ['username', 'avatar'],
      },
    ],
  });
  res.send(response(httpStatus.CREATED, 'Create review success', data));
});

//8. Get images by productId
const getOwnImages = catchAsync(async (req, res) => {
  const product = await productService.getProductByPk(req.product.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const images = await productService.getAllImageByProductId(req.product.id);
  res.send(response(httpStatus.OK, 'Get images success', images));
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  // getOwnReviews,
  createProductReview,
  getOwnImages,
};
