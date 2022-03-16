const multer = require('multer');
const express = require('express');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const uploadController = require('../../controllers/upload.controller');
const router = express.Router();

router.route('/').post(auth(), upload.single('image'), uploadController.uploadImage);

module.exports = router;
