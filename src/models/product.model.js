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

const deleteProductById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (!result.length) return null;
  
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  
  return result;
};

const getProductByName = async (name) => {
  const [result] = await connection.execute(`SELECT * FROM products WHERE name LIKE '%${name}%'`);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  getProductByName,
};