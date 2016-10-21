module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
    name: err.name,
    errors: err.errors
  });
};
