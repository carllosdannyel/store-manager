const salesModel = require('../models/sales.model');

const createSales = async (sales) => {
  const sale = await salesModel.createSales(sales);
  return sale;
};

module.exports = {
  createSales,
};