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

const insertIntoSalesProducts = async (saleId, sale) => connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, sale.productId, sale.quantity]);

const insertSales = async (body) => {
  const products = await Promise.all(body.map(({ productId }) => getProductById(productId)));

  if (products.includes(undefined)) return undefined;
  
  const [{ insertId }] = await insertIntoSales();

  await Promise.all(body.map((sale) => insertIntoSalesProducts(insertId, sale)));

  return insertId;
};

const updateSales = async (saleId, { productId, quantity }) => connection.execute(
  'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?',
  [productId, quantity, saleId, productId],
);

module.exports = {
  getProductById,
  getSaleById,
  insertIntoSales,
  insertIntoSalesProducts,
  insertSales,
  updateSales,
};