const productService = require('../services/product.service');
const { mapError } = require('../utils/error.map');

const getAllProducts = async (_req, res) => {
  const { message } = await productService.getAllProducts();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productService.getProductById(+id);
  if (status) {
    return res.status(mapError(status)).json({ message });
  }
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProduct(name);
  if (newProduct.type) {
    const { type, message } = newProduct;
    return res.status(mapError(type)).json({ message });
  }
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const {
    params: { id },
    body: { name },
  } = req;
  const product = await productService.updateProduct(+id, name);
  if (product.type) {
    const { type, message } = product;
    return res.status(mapError(type)).json({ message });
  }

  if (product.status) {
    const { status, message } = product;
    return res.status(mapError(status)).json({ message });
  }
  res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productService.deleteProductById(+id);
  if (status || message) {
    return res.status(mapError(status)).json({ message });
  }
  return res.status(204).json(message);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;
  const products = await productService.getProductByName(q);
  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  getProductByName,
};
