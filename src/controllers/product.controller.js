const productService = require('../services/product.service');
const { statusHttpError } = require('../utils/status.http.error');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.getAllProducts();
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productService.getProductById(+id);
  if (status) {
    return res.status(statusHttpError(status)).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};