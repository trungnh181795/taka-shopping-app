const httpStatus = require('http-status');
const { Media } = require('../models');
const ApiError = require('../utils/ApiError');

const updateMediaByPk = async (mediaId, updateBody) => {
  const media = await Media.findByPk(mediaId);
  if (!media) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found');
  }
  Object.assign(media, updateBody);
  await media.save();
  return media;
};

module.exports = {
  updateMediaByPk,
};
