const salesService = require('../services/sales.service');
const { mapError } = require('../utils/error.map');
const salesProductsService = require('../services/sales.product.service');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(+id);
  if (status) {
    return res.status(mapError(status)).json({ message });
  }
  res.status(200).json(message);
};

const deleteSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.deleteSalesById(+id);
  if (status || message) {
    return res.status(mapError(status)).json({ message });
  }

  res.status(204).json(message);
};

const insertSales = async (req, res) => {
  const sales = await salesProductsService.insertSales(req.body);
  if (sales.type) {
    const { type, message } = sales;
    return res.status(mapError(type)).json({ message });
  }
  return res.status(201).json(sales);
};

module.exports = {
  getAllSales,
  getSalesById,
  deleteSalesById,
  insertSales,
};