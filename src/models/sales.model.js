const camelize = require('camelize');
const { connection } = require('./db/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM sales_products as sp
    INNER JOIN sales as s
    ON s.id = sp.sale_id
    INNER JOIN products as p
    ON p.id = sp.product_id
    ORDER BY sale_id, product_id`,
  );
  return camelize(result);
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM sales_products as sp
    INNER JOIN sales as s
    ON sp.sale_id = s.id
    WHERE s.id = ?;`, [id],
  );

  return camelize(result);
};

const deleteSalesById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  if (!result.length) return null;
  
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
  deleteSalesById,
};
