const salesService = require('../services/sales.service');
const { mapError } = require('../utils/error.map');

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

module.exports = {
  getAllSales,
  getSalesById,
  deleteSalesById,
};