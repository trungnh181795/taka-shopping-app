const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderValidation.createOrder), orderController.createOrder)
  .get(auth('manageOrders'), validate(orderValidation.getOrders), orderController.getOrders);

router.route('/my-orders').get(auth(), orderController.getMyOrders);

router.route('/paid/:orderId').patch(auth(), validate(orderValidation.updateIsPaid), orderController.updateIsPaid);

router
  .route('/:orderId')
  .get(auth(), validate(orderValidation.getOrderDetails), orderController.getOrderDetails)
  .patch(auth('manageOrders'), validate(orderValidation.updateOrder), orderController.updateOrder);

module.exports = router;
