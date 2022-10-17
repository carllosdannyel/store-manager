const { connection } = require('./db/connection');

const getProductById = async (productId) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return result;
};

const getSaleById = async (saleId) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [saleId]);
  return result;
};

const insertIntoSales = async () => connection.execute('INSERT INTO sales (date) VALUES (NOW())');

const insertIntoSalesProducts = async (saleId, { productId, quantity }) => connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity]);

const updateSales = async (saleId, { productId, quantity }) => connection.execute(
  'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?',
  [productId, quantity, saleId, productId],
);

module.exports = {
  getProductById,
  getSaleById,
  insertIntoSales,
  insertIntoSalesProducts,
  updateSales,
};