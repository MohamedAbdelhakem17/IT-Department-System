const asyncHandler = require("express-async-handler");

const httpStatus = require("../config/httpStatus");
const AppError = require("../utils/appError");
const Factory = require("./factoryController");
const EmployeeModel = require("../models/EmployeeModel");
const HQModel = require("../models/HQModel");

// @desc   Get  all Departments
// @route  get /api/v1/departments
// @access Public
const getAllDepartments = Factory.getAll(HQModel);

// @desc   Get  one Department
// @route  get /api/v1/departments/:id
// @access Public
const getDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await HQModel.findById(id, { __v: 0 });
  if (!data) {
    throw new AppError(404, httpStatus.FAIL, `Document not found for ID ${id}`);
  }
  const employeesCount = await HQModel.getEmployeesCount(id);
  const devicesCount = await HQModel.getDeviceCount(id);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: {
      department: data,
      employeesCount: employeesCount,
      devicesCount: devicesCount,
    },
  });
});

// @desc   add  new Departments
// @route  post /api/v1/departments
// @access Public
const createDepartment = Factory.createOne(HQModel);

// @desc   update exist  Department
// @route  put /api/v1/departments/:id
// @access Public
const updateDepartment = Factory.updateOne(HQModel);

// @desc   delete  one Department
// @route  DELETE /api/v1/departments/:id
// @access Public
const deleteDepartment = Factory.deleteOne(HQModel);

// @desc   Get  all Employees in specific Department
// @route  get /api/v1/departments/:id/employee
// @access Public
const getDepartmentEmployees = asyncHandler(async (req, res) => {
  const departmentId = req.params.id;
  const employeeInDepartment = await EmployeeModel.find(
    {
      department: departmentId,
    },
    { __v: 0 }
  ).populate({
    path: "device",
    select: "_id type model",
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
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees,
};
