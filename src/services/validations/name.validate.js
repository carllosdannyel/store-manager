const { nameSchema } = require('./schemas');

const nameValidate = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
    const { type, message } = error.details[0];
    const typeError = type === 'string.min' ? 'UNPROCESSABLE_ENTITY' : 'BAD_REQUEST';
    return { type: typeError, message };
  }

  return { type: null, message: '' };
};

module.exports = {
  nameValidate,
};