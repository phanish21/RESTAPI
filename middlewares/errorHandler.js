const errorHandler = (err, req, res, next) => {
  // Use existing status code or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  
  // Send error message as JSON response
  res.json({
    message: err.message,
  });
};

module.exports = errorHandler;
