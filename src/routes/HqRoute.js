const express = require("express");

const router = express.Router();

const {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees,
  upload,
  imageManipulation,
} = require("../controller/HqController");

const {
  createDepartmentValidator,
  updateDepartmentValidator,
  checkIsValidId,
} = require("../utils/validators/departmentValidator");

router
  .route("/")
  .get(getAllDepartments)
  .post(
    upload.single("imageCover"),
    imageManipulation,
    createDepartmentValidator,
    createDepartment
  );

router
  .route("/:id")
  .get(checkIsValidId, getDepartment)
  .put(updateDepartmentValidator, updateDepartment)
  .delete(checkIsValidId, deleteDepartment);

router.get("/:id/employee", checkIsValidId, getDepartmentEmployees);

module.exports = router;
