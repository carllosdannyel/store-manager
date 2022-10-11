const status = {
  NOT_FOUND: 404,
};

const statusHttpError = (type) => status[type];

module.exports = {
  statusHttpError,
};