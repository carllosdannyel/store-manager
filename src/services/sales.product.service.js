const salesProductModel = require('../models/sales.product.model');

const insertSales = async (body) => {
  const insertId = await salesProductModel.insertSales(body);

  if (!insertId) return { type: 'NOT_FOUND', message: 'Product not found' };
  
  return { id: insertId, itemsSold: body };
};

const updateSales = async (saleId, body) => {
  const products = await Promise.all(body.map(({ productId }) => salesProductModel
    .getProductById(productId)));
  
  if (products.includes(undefined)) return { type: 'NOT_FOUND', message: 'Product not found' };

  const sales = await salesProductModel.getSaleById(saleId);
  if (!sales) return { type: 'NOT_FOUND', message: 'Sale not found' };

  await Promise.all(body.map((sale) => salesProductModel.updateSales(saleId, sale)));
  return { saleId, itemsUpdated: body };
};

module.exports = {
  insertSales,
  updateSales,
};