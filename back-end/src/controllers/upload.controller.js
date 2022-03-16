const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');
const response = require('../utils/responseTemp');

//1. Upload img
const uploadImage = catchAsync(async (req, res) => {
  const imageURL = await uploadService.uploadImage(req, res);
  res.send(response(httpStatus.CREATED, 'Upload Image Success', { imageURL }));
});

module.exports = {
  uploadImage,
};
