const salesService = require('../services/sales.service');

const createSales = async (req, res) => {
  const sales = await salesService.createSales(req.body);
  res.status(201).json(sales);
};

module.exports = {
  createSales,
};