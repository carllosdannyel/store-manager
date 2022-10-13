const { connection } = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)', [name],
);
  return insertId;
};

const updateProduct = async (id, name) => {
  const [[exist]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (!exist) return exist;

  await connection.execute('UPDATE products SET name = ?', [name]);
  return { id, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};