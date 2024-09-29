const asyncHandler = require("express-async-handler");

const httpStatus = require("../config/httpStatus");
const AppError = require("../utils/appError");
const Factory = require("./factoryController")
const EmployeeModel = require("../models/EmployeeModel");


// @desc   Get  all Departments
// @route  get /api/v1/departments
// @access Public
const filterEmployeeObject = (req, res, next) => {
  if (req.query.workin) {
    req.body.filterObj = { workInHq: true };
    next()
  }

  if (req.query.branch) {
    req.body.filterObj = { branch: req.query.branch };
    next()
  }

  next()
};

const getAllEmployee = Factory.getAll(EmployeeModel);

// @desc   Get  all Employees in specific Department
// @route  get /api/v1/employee/workin/:id
// @access Public
const getEmployeeWorkIn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employeeInDepartment = await EmployeeModel.find(
    {
      $or: [{ branch: id }, { department: id, }]
    },
    { __v: 0 }

  ).populate({
    path: "device",
    select: "type _id user"
  });

  if (employeeInDepartment.length === 0)
    throw new AppError(
      404,
      httpStatus.FAIL,
      "No Employees Found in This Department"
    );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: {
      employee: employeeInDepartment,
      count: employeeInDepartment.length,
    },
  });
});

module.exports = {
  getAllEmployee,
  filterEmployeeObject,
  getEmployeeWorkIn,
};
