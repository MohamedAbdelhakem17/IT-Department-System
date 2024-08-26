const asyncHandler = require("express-async-handler");

const httpStatus = require("../config/httpStatus");
const AppError = require("../utils/appError");
const Factory = require("./factoryController");
const BranchModel = require("../models/BranchModel");

//  @desc   Get All Branches
//  @route  GET /api/v1/branches
//  @access Public
const getBranches = Factory.getAll(BranchModel, {
  name: 1,
  slug: 1,
  "line.renewAt": 1,
});

//  @desc   Get one Branch
//  @route  GET /api/v1/branches/:id
//  @access Public
const getBranch = Factory.getOne(BranchModel);

//  @desc   Add New Branch
//  @route  POST /api/v1/branches
//  @access Public
const createBranch = Factory.createOne(BranchModel);

//  @desc   Update Branch Name
//  @route  PUT /api/v1/branches/:id
//  @access Public
const updateBranchName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await BranchModel.findByIdAndUpdate(
    id,
    { $set: { name: req.body.name } },
    { new: true, select: "-__v" }
  );
  if (!data)
    throw new AppError(404, httpStatus.FAIL, `Branch not found for ID ${id}`);
  res.status(200).json({ status: httpStatus.SUCCESS, data });
});

//  @desc   Update Branch Line Data
//  @route  PUT /api/v1/branches/:id/line
const updateBranchLineData = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedBranch = await BranchModel.findByIdAndUpdate(
    id,
    { $set: { line: updateData } },
    { new: true, select: "-__v" }
  );

  if (!updatedBranch) {
    return next(
      new AppError(404, httpStatus.FAIL, `Branch not found for ID ${id}`)
    );
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updatedBranch.line,
  });
});

// @desc   Update Branch Line Data
// @route  PUT /api/v1/branches/:id/device/:deviceId
// @access Public
const updateBranchDevices = asyncHandler(async (req, res) => {
  const { id, deviceId } = req.params;
  const updateFields = req.body;
  const branch = await BranchModel.findById(id);
  if (!branch) {
    throw new AppError(404, httpStatus.FAIL, `Branch not found for ID ${id}`);
  }

  const deviceIndex = branch.devices.findIndex(
    (device) => device._id.toString() === deviceId
  );

  if (deviceIndex === -1) {
    throw new AppError(
      404,
      httpStatus.FAIL,
      `Device not found for ID ${deviceId}`
    );
  }

  branch.devices[deviceIndex] = {
    ...branch.devices[deviceIndex],
    ...updateFields,
  };
  const updatedBranch = await branch.save();

  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: updatedBranch.devices });
});

// @desc   Delete a Device from Branch
// @route  DELETE /api/v1/branches/:id/device/:deviceId
// @access Public
const deleteBranchDevice = asyncHandler(async (req, res) => {
  const { id, deviceId } = req.params;

  const updatedBranch = await BranchModel.findByIdAndUpdate(
    id,
    { $pull: { devices: { _id: deviceId } } },
    { new: true, select: "-__v" }
  );

  if (!updatedBranch) {
    throw new AppError(404, httpStatus.FAIL, `Branch not found for ID ${id}`);
  }

  const deviceRemoved = updatedBranch.devices.some(
    (device) => device._id.toString() === deviceId
  );

  if (deviceRemoved) {
    throw new AppError(
      404,
      httpStatus.FAIL,
      `Device not found for ID ${deviceId}`
    );
  }

  res.status(200).json({ status: httpStatus.SUCCESS, data: updatedBranch });
});

module.exports = {
  createBranch,
  getBranches,
  getBranch,
  updateBranchName,
  updateBranchLineData,
  updateBranchDevices,
  deleteBranchDevice,
};
