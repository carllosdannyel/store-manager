const salesService = require('../services/sales.service');
const { mapError } = require('../utils/error.map');

const getAllSales = async (req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(+id);
  console.log('camada de controller', { type, message });

  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  res.status(200).json(message);
};

module.exports = {
  getAllSales,
  getSalesById,
};