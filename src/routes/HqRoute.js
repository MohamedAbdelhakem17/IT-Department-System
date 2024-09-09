const express = require("express");

const router = express.Router();

const {
  getAllDepartments,
  getAllDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees,
} = require("../controller/HqController");

const {
  createDepartmentValidator,
  updateDepartmentValidator,
  checkIsValidId,
} = require("../utils/validators/departmentValidator");

router
  .route("/")
  .get(getAllDepartments)
  .post(createDepartmentValidator, createDepartment);

router
  .route("/:id")
  .get(checkIsValidId, getAllDepartment)
  .put(updateDepartmentValidator, updateDepartment)
  .delete(checkIsValidId, deleteDepartment);

router.get("/:id/employee", checkIsValidId, getDepartmentEmployees);

module.exports = router;
