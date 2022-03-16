const Joi = require('joi');

const updateMedia = {
  params: Joi.object().keys({
    mediaId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      url: Joi.string().optional(),
      type: Joi.string().optional(),
    })
    .min(1),
};

module.exports = {
  updateMedia,
};
