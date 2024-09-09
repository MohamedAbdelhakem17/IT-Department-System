const { check } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require("../../middleware/validatorMiddleware");
const HQModel = require("../../models/HQModel");

const departmentValidator = (isUpdate = false) => [
  check("id")
    .if(() => isUpdate)
    .trim()
    .notEmpty()
    .withMessage("Department ID is required")
    .isMongoId()
    .withMessage("This is not a valid MongoDB ID"),
  check("name")
    .trim()
    .notEmpty()
    .withMessage("You must insert a department name")
    .isLength({ min: 2 })
    .withMessage("Department name must be at least 2 characters long")
    .custom(async (val, { req }) => {
      req.body.slug = slugify(val);
      const department = await HQModel.findOne({ name: val });
      if (department) {
        throw new Error("This department already exists; it must be unique.");
      }
      return true;
    }),
  validatorMiddleware,
];

const checkIsValidId = [
  check("id")
    .trim()
    .notEmpty()
    .withMessage("Department ID is required")
    .isMongoId()
    .withMessage("This is not a valid MongoDB ID"),
  validatorMiddleware,
];

module.exports = {
  createDepartmentValidator: departmentValidator(false),
  updateDepartmentValidator: departmentValidator(true),
  checkIsValidId,
};
