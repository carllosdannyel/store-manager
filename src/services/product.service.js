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
  if (validation.type) {
    return validation;
  }
  
  const newProduct = await productModel.createProduct(name);
  return { id: newProduct, name };
};

const updateProduct = async (id, name) => {
  const validation = nameValidate(name);
  if (validation.type) return validation;

  const product = await productModel.updateProduct(id, name);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };
  
  return product;
};

const deleteProductById = async (id) => {
  const productDeleted = await productModel.deleteProductById(id);

  if (!productDeleted) {
    return { status: 'NOT_FOUND', message: 'Product not found' }; 
  }

  return { status: null, message: null };
};

const getProductByName = async (name) => {
  const products = await productModel.getProductByName(name);
  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  getProductByName,
};