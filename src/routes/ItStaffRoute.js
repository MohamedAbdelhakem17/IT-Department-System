const express = require("express");

const router = express.Router();

const { addEmployee, login } = require("../controller/ITStaffController");
const {
  createItStaffValidator,
} = require("../utils/validators/itStaffValidator");

router.post("/addEmployee", createItStaffValidator, addEmployee);
router.post("/login", login);

module.exports = router;
