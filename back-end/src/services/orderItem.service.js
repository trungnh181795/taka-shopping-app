const { OrderItems, Products, Media } = require('../models');

/**
 * Create order items in bulk
 * @param {String, Array} orderId, items
 * @returns {Promise<OrderItems>}
 */
const createOrderItems = async (orderId, items) => {
  const itemArr = items.map((item) => ({ ...item, orderId }));
  return OrderItems.bulkCreate(itemArr);
};

/**
 * Get all orders items
 * @param {String} orderId
 * @returns {Promise<OrderItems>}
 */
const getOrderItems = async (orderId) => {
  const items = await OrderItems.findAll({
    where: {
      orderId,
    },
    attributes: ['id', 'quantity', 'price', 'total'],
    include: [
      {
        model: Products,
        attributes: ['name', 'brand', 'category'],
        include: [{ model: Media, as: 'images', attributes: ['url'] }],
        as: 'itemInfo',
      },
    ],
  });
  return items;
};

module.exports = {
  getOrderItems,
  createOrderItems,
};
