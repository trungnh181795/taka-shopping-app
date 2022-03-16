const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mediaService } = require('../services');
const response = require('../utils/responseTemp');

//1. Update media
const updateMedia = catchAsync(async (req, res) => {
  const media = await mediaService.updateMediaByPk(req.params.mediaId, req.body);
  res.send(response(httpStatus.OK, 'Update media success', media));
});

module.exports = {
  updateMedia,
};
