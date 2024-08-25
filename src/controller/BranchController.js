const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const BranchModel = require("../models/BranchModel");
//  @desc   Add New Branch
//  @route  Post / api/v1/branch
//  @access  Public

const createBranch = asyncHandler(async (req, res) => {
  const data = await BranchModel.create({
    ...req.body,
    slug: slugify(req.body.name),
  });

  res.status(201).json({ status: "ok", data });
});

module.exports = {
  createBranch,
  // Fix 
};
