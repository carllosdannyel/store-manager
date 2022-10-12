const salesService = require('../services/sales.service');

const getAllSales = async (req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

module.exports = {
  getAllSales,
};