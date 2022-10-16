const { validateSales } = require('../services/validations/sales.validate');
const { mapError } = require('../utils/error.map');

const salesValidate = (req, res, next) => {
  const { type, message } = validateSales(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  next();
};

module.exports = {
  salesValidate,
};