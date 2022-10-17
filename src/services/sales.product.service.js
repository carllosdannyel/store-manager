const salesProductModel = require('../models/sales.product.model');

const insertSales = async (body) => {
  const products = await Promise.all(body.map(({ productId }) => salesProductModel
    .getProductById(productId)));

  if (products.includes(undefined)) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  const [{ insertId }] = await salesProductModel.insertIntoSales();

  await body.forEach((sale) => salesProductModel.insertIntoSalesProducts(insertId, sale));

  return { id: insertId, itemsSold: body };
};

const updateSales = async (saleId, body) => {
  const sales = await salesProductModel.getSaleById(saleId);
  if (!sales) return { type: 'NOT_FOUND', message: 'Sale not found' };

  const products = await Promise.all(body.map(({ productId }) => salesProductModel
    .getProductById(productId)));
  
  if (products.includes(undefined)) return { type: 'NOT_FOUND', message: 'Product not found' };

  await body.forEach((sale) => salesProductModel.updateSales(saleId, sale));

  return { saleId, itemsUpdated: body };
};

module.exports = {
  insertSales,
  updateSales,
};