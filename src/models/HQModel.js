const mongoose = require("mongoose");
const DevicesModel = require("./DevicesModel");
const EmployeeModel = require("./EmployeeModel");

const HQSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Department name is required."],
      unique: [true, "Department name must be unique."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: [true, "Slug must be unique."],
      required: [true, "Slug is required."],
    },
    imageCover: {
      type: String,
      validate: {
        validator: function (v) {
          return v ? /\.(jpg|jpeg|png|gif)$/i.test(v) : true;
        },
        message: "Invalid image format. Allowed formats: jpg, jpeg, png, gif.",
      },
    },
    manager: {
      name: {
        type: String,
        trim: true,
        required: [true, "Manager name is required."],
      },
      phone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

HQSchema.statics.getDeviceCount = async function () {
  const deviceCount = await DevicesModel.find({
    workLocation: "Hq",
  }).countDocuments();
  return deviceCount;
};

HQSchema.statics.getEmployeesCount = async function (value) {
  const employeeCount = await EmployeeModel.find({
    department: value,
  }).countDocuments();
  return employeeCount;
};

const HQModel = mongoose.model("Hq", HQSchema);

module.exports = HQModel;
