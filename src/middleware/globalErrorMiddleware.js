const httpStatus = require("../config/httpStatus");

const globalError = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusText = error.statusText || httpStatus.ERROR;

  res.status(statusCode).json({
    status: statusText,
    message: error.message,
    stack: process.env.ENVIRONMENT_MODE === "development" ? error.stack : undefined,
  });
};

module.exports = globalError;
