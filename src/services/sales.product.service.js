const salesProductModel = require('../models/sales.product.model');

const insertSales = async (body) => {
  const sales = await salesProductModel.insertSales(body);
  return sales;
};

module.exports = {
  insertSales,
};