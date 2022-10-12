const { connection } = require('./db/connection');

const getProductById = async (sales) => sales.map(async ({ productId }) => connection
  .execute('SELECT * FROM products WHERE id = ?', [productId]));

const allProducts = async (testes) => {
  const result = await testes.map((test, i) => test[i]);
  return result;
};

const createSales = async (sales) => {
  const result = await allProducts(await getProductById(sales));
  return result;
};

module.exports = {
  createSales,
};
