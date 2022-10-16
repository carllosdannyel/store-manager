const { connection } = require('./db/connection');

const getProductById = async (productId) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return result;
};

const insertIntoSales = async () => connection.execute('INSERT INTO sales (date) VALUES (NOW())');

const insertIntoSalesProducts = async (saleId, sale) => connection
  .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, sale.productId, sale.quantity]);

const insertSales = async (body) => {
  const products = await Promise.all(body.map(({ productId }) => getProductById(productId)));

  if (products.includes(undefined)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  
  const [{ insertId }] = await insertIntoSales();

  await Promise.all(body.map((sale) => insertIntoSalesProducts(insertId, sale)));

  return { id: insertId, itemsSold: body };
};

module.exports = {
  insertSales,
};