const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

module.exports = {
  getAllProducts,
};