const errorMap = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

const mapError = (type) => errorMap[type];

module.exports = {
  mapError,
};