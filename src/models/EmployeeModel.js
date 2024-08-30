const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Employee Code is required."],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Employee name is required."],
    },
    phone: {
      type: String,
      required: [true, "Employee phone number is required."],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    shift: {
      type: String,
      enum: ["morning", "night"],
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);
module.exports = EmployeeModel;
