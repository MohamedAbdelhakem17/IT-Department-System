const asyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

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

//  upload image
const imageStorage = multer.memoryStorage();
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({ storage: imageStorage, fileFilter: imageFilter });

const imageManipulation = async (req, res, next) => {
  if (req.file) {
    const imageCoverFileName = `department-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.file.buffer)
      .resize(400, 400)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/department/${imageCoverFileName}`);
    req.body.imageCover = imageCoverFileName;
  }
  next();
};

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
    select:"type _id user"
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
  upload,
  imageManipulation,
};
