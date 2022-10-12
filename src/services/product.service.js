const productModel = require('../models/product.model');
const { nameValidate } = require('./validations/name.validate');

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

const createProduct = async (name) => {
  const validation = nameValidate(name);
  console.log(validation);
  if (validation.type) {
    return validation;
  }
  
  const newProduct = await productModel.createProduct(name);
  return { id: newProduct, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};