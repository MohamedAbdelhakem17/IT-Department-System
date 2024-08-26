const asyncHandler = require("express-async-handler");

const httpStatus = require("../config/httpStatus");
const AppError = require("../utils/appError");

// Get all documents from a model
const getAll = (Model, selectOptions = "") =>
  asyncHandler(async (req, res) => {
    const data = await Model.find({}, selectOptions);
    res.status(httpStatus.SUCCESS).json({ status: httpStatus.SUCCESS, data });
  });

// Get a single document by ID
const getOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findById(id, { __v: 0 });
    if (!data) {
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Document not found for ID ${id}`
      );
    }
    res.status(httpStatus.SUCCESS).json({ status: httpStatus.SUCCESS, data });
  });

// Create a single document
const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const data = await Model.create(req.body);
    res.status(201).json({ status: httpStatus.SUCCESS, data });
  });

// Update a single document by ID
const updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Can't find document for ID: ${id}`
      );
    }
    res.status(200).json({ status: httpStatus.SUCCESS, data });
  });

// Delete a single document by ID
const deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete(id);
    if (!data) {
      throw new AppError(
        404,
        httpStatus.FAIL,
        `Can't find document for ID: ${id}`
      );
    }
    res.status(200).json({ status: httpStatus.SUCCESS, data: null });
  });

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
