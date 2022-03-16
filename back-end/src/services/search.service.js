const { Products, Media } = require('../models');

const paginationService = require('./pagination.service');
const { Op } = require('sequelize');

const getProductsByKeyword = async (filter, options) => {
  const page = parseInt(options.page, 10);
  const size = parseInt(options.size, 10);
  const { limit, offset } = paginationService.getPagination(page, size);

  if (!options.sortBy) options.sortBy = 'createdAt';
  if (!options.order) options.order = 'desc';
  const data = await Products.findAndCountAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: '%' + filter.keyword + '%' } }],
    },
    limit,
    offset,
    order: [[options.sortBy, options.order]],
    include: [
      {
        model: Media,
        as: 'images',
        attributes: ['type', 'url', 'id'],
      },
    ],
    distinct: true,
  });

  return paginationService.getPagingData(data, page, limit);
};

module.exports = {
  getProductsByKeyword,
};
