const productService = require('../services/product.service');
const { statusHttpError } = require('../utils/status.http.error');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.getAllProducts();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productService.getProductById(+id);
  if (status) {
    return res.status(statusHttpError(status)).json({ message });
  }
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProduct(name);
  res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};