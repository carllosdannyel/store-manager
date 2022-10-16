const { saleSchema } = require('./schemas');

const validateSales = (sales) => {
  let result = { type: null, message: '' };

  sales.forEach((sale) => {
    const { error } = saleSchema.validate(sale);
    if (error) {
      const type = error.details[0].type === 'number.min' ? 'UNPROCESSABLE_ENTITY' : 'BAD_REQUEST';
      result = { type, message: error.message };
    }
  });

  return result;
};

module.exports = {
  validateSales,
};