const multer = require('multer');
const config = require('../config/config');
const cloudinary = require('cloudinary');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

cloudinary.config(config.cloudinary);

const uploadImage = async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: 'uploads_media',
    use_filename: true,
  });
  let imageURL = result.secure_url;

  if (!imageURL) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong upload');
  }
  return imageURL;
};

module.exports = {
  uploadImage,
};
