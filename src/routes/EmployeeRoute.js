const express = require("express");

const router = express.Router();

const {

  getEmployeeWorkIn, filterEmployeeObject, getAllEmployee

} = require("../controller/EmployeeController");



router.get("/", filterEmployeeObject, getAllEmployee);

router.get("/workin/:id", getEmployeeWorkIn);

module.exports = router;
