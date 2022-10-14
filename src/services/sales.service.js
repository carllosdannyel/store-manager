const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales.length) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { status: null, message: sales };
};

const deleteSalesById = async (id) => {
  const salesDelected = await salesModel.deleteSalesById(id);
  if (!salesDelected) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { status: null, message: null };
};

module.exports = {
  getAllSales,
  getSalesById,
  deleteSalesById,
};
