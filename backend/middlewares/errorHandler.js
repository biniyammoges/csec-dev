const ErrorResponse = require("../utils/errorResponse");

const notFound = (req, res, next) => {
  next(new ErrorResponse(`Url not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Dupplication error
  if (err.code === 11000) {
    const message = "Duplicate key value entered";
    error = new ErrorResponse(message, 400);
  }

  // Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

module.exports = { errorHandler, notFound };
