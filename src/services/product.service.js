const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return { status: null, message: products };
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    return { status: 'NOT_FOUND', message: 'Product not found' };
  }
  return { status: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};