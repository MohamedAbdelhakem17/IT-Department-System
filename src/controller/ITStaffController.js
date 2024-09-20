const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const httpStatus = require("../config/httpStatus");
const ItStaffModel = require("../models/ItStaffModel");

// @desc   create it Employee
// @route  post /api/v1/auth/addEmployee
// @access praivet / admin
const addEmployee = asyncHandler(async (req, res) => {
  const data = await ItStaffModel.create(req.body);
  res.status(201).json({ status: httpStatus.SUCCESS, data });
});

// @desc   user Login
// @route  post /api/v1/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await ItStaffModel.findOne({ username });

  if (!user)
    throw new AppError(
      404,
      httpStatus.FAIL,
      "User not found. Please verify the username or contact support."
    );

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword)
    throw new AppError(
      401,
      httpStatus.FAIL,
      "Invalid email or password. Please try again."
    );

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });

  user.token = token;
  await user.save();

  delete user._doc.password;
  delete user._doc.token;

  res.status(200).json({ status: httpStatus.SUCCESS, data: user, token });
});

// @desc  allwo user to use routes
const allowTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        403,
        httpStatus.FAIL,
        "You are not allowed to access this route."
      );
    }
    next();
  };

// @desc   make sure the user is logged in
const protect = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new AppError(
      401,
      httpStatus.ERROR,
      "You are not login, Please login to get access this route"
    );
  }

  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await ItStaffModel.findOne({ _id: decode.userId });
  if (!user) {
    throw new AppError(
      404,
      httpStatus.ERROR,
      "The user that belong to this token does no longer exist"
    );
  }

  if (user.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimestamp > decode.iat)
      throw new AppError(
        401,
        httpStatus.ERROR,
        "User recently changed his password. please login again.."
      );
  }

  req.user = user;

  next();
});

module.exports = {
  addEmployee,
  login,
  allowTo,
  protect,
};
