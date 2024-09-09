const { validationResult } = require("express-validator");

const AppError = require("../utils/appError");
const httpStatus = require("../config/httpStatus");
const errorForamt = require("../utils/errorFormat");

const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new AppError(400, httpStatus.FAIL, errorForamt(result.array()));
  }
  next();
};

module.exports = validatorMiddleware;
