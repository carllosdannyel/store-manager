const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { status: null, message: sales };
};

module.exports = {
  getAllSales,
  getSalesById,
};
