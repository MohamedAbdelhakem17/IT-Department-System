const { check } = require("express-validator");
const ItStaffModel = require("../../models/ItStaffModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

const createItStaffValidator = [
  check("code").trim().notEmpty().withMessage("Fingerprint code is required"),

  check("name").trim().notEmpty().withMessage("Employee name is required"),

  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^[a-z0-9_]{6,}$/)
    .withMessage(
      "Invalid username: use at least 6 characters, lowercase letters, and underscores only."
    )
    .custom(async (value) => {
      const user = await ItStaffModel.findOne({ username: value });
      if (user) throw new Error("This username already exists.");
      return true;
    }),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$_%^&*]).*$/)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),

  check("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National ID is required")
    .isLength({ min: 14, max: 14 })
    .withMessage("National ID must be exactly 14 digits.")
    .matches(/^\d{14}$/)
    .withMessage("National ID must contain only digits."),

  check("birthday")
    .optional()
    .trim()
    .isDate()
    .withMessage("Invalid date format."),

  validatorMiddleware,
];

module.exports = {
  createItStaffValidator,
};
