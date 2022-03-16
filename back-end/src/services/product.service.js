const httpStatus = require('http-status');
const { Users, Tokens, Products, Reviews, Media } = require('../models');
const paginationService = require('./pagination.service');
const ApiError = require('../utils/ApiError');
const { authService } = require('../services');

//1. create product
const createProduct = async (productBody) => {
  const { imageUrls, ...rest } = productBody;
  const product = await Products.create(rest);
  await Media.bulkCreate(
    imageUrls.map((url) => ({
      type: 'image',
      url,
      productId: product.id,
    }))
  );
  product.dataValues.imageUrls = imageUrls;
  return product;
};

//2. Get all product and pagination
const queryProducts = async (filter, options) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);
  if (!options.sortBy) options.sortBy = 'createdAt';
  if (!options.order) options.order = 'desc';
  const data = await Products.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [[options.sortBy, options.order]],
    include: [
      {
        model: Media,
        as: 'images',
        attributes: ['id', 'url', 'type'],
      },
    ],
    distinct: true,
  });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const products = paginationService.getPagingData(data, page, limit);
  return products;
};

//3. Get product by id
const getProductByPk = async (productId) => {
  const data = await Products.findOne({
    where: { id: productId },
    include: [
      {
        model: Media,
        as: 'images',
        attributes: ['url', 'type'],
      },
    ],
  });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return data;
};

//4. Get product by name
const getProductByName = async (_name) => {
  return Products.findOne({ where: { name: _name } });
};

//5. Get product by brand
const getProductByBrand = async (_brand) => {
  return Products.findOne({ where: { brand: _brand } });
};

//6. update product by pk
const updateProductByPk = async (productId, updateBody) => {
  const product = await Products.findByPk(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

//7. Delete product by pk
const deleteProductByPk = async (productId) => {
  const product = await Products.findByPk(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.destroy();
  return product;
};

//8. Get review by productId
const getAllReviewByProductId = async (filter, options, id) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);
  if (!options.sortBy) options.sortBy = 'createdAt';
  if (!options.order) options.order = 'asc';
  const data = await Reviews.findAndCountAll({
    where: [filter, { productId: id }],
    limit,
    offset,
    order: [[options.sortBy, options.order]],
    attributes: ['content', 'rating', 'createdAt'],
    include: [
      {
        model: Users,
        as: 'userReview',
        attributes: ['username', 'avatar'],
      },
    ],
    distinct: true,
  });
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const reviews = paginationService.getPagingData(data, page, limit);
  return reviews;
};

//9. Create review for product
const createProductReview = async (productId, reviewBody) => {
  const product = await Products.findByPk(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (await Reviews.findOne({ where: { userId: reviewBody.userId, productId: reviewBody.productId } })) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You can review only once');
  }

  product.rating = (product.rating * product.numOfReviews + reviewBody.rating) / (product.numOfReviews + 1);
  product.numOfReviews += 1;
  await product.save();

  return Reviews.create(reviewBody);
};

//10. Get image (media) by productId
const getAllImageByProductId = async (id) => {
  return Media.findAll({ where: { productId: id } });
};

module.exports = {
  createProduct,
  queryProducts,
  getProductByPk,
  getProductByName,
  getProductByBrand,
  updateProductByPk,
  deleteProductByPk,
  getAllReviewByProductId,
  createProductReview,
  getAllImageByProductId,
};
