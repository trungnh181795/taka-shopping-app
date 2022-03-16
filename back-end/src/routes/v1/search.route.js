const express = require('express');
const validate = require('../../middlewares/validate');
const searchValidation = require('../../validations/search.validation');
const searchController = require('../../controllers/search.controller');

const router = express.Router();

router.route('/').get(validate(searchValidation.getProductsByKeyword), searchController.getProductsByKeyword);

module.exports = router;
