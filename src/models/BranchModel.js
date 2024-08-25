const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Branch name is required."],
      unique: [true, "Branch name must be unique."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: [true, "Slug must be unique."],
      required: [true, "Slug is required."],
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    devices: [
      {
        name: {
          type: String,
          required: [true, "Device name is required."],
        },
        model: {
          type: String,
          required: [true, "Device model is required."],
        },
        anyDesk: {
          type: String,
          trim: true,
        },
      },
    ],
    line: {
      number: {
        required: [true, "Line Number is required."],
        type: String,
      },
      provider: {
        type: String,
        required: [true, "Line provider is required."],
      },
      type: {
        type: String,
        enum: ["4G", "land line"],
        required: [true, "Line type is required."],
      },
      renewAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const BranchModel = mongoose.model("Branch", branchSchema);
module.exports = BranchModel;
