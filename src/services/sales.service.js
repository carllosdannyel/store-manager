const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  console.log('camada de service', sales);
  if (sales.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sales };
};

module.exports = {
  getAllSales,
  getSalesById,
};