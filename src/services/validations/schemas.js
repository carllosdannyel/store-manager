const Joi = require('joi');

const nameSchema = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.empty': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

module.exports = {
  nameSchema,
};