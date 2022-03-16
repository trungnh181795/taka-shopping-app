const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mediaValidation = require('../../validations/media.validation');
const mediaController = require('../../controllers/media.controller');
const router = express.Router();

router.route('/:mediaId').patch(auth('manageMedia'), validate(mediaValidation.updateMedia), mediaController.updateMedia);

module.exports = router;
