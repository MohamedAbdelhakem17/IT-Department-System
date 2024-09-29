const mongoose = require("mongoose");
const {DeviceModel} = require("./DevicesModel");
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
    managerName: {
      type: String,
      trim: true,
      required: [true, "Manager name is required."],
    },
    managerPhone: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Static method to get device count for this HQ department
HQSchema.statics.getDeviceCount = async function (departmentId) {
  const deviceCount = await DeviceModel.countDocuments({
    department: departmentId,
  });

  return deviceCount;
};

// Static method to get employee count for this HQ department
HQSchema.statics.getEmployeesCount = async function (departmentId) {
  const employeeCount = await EmployeeModel.countDocuments({
    department: departmentId,
  });
  return employeeCount;
};

HQSchema.post(["save", "init"], (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_USRL}/department/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
});

const HQModel = mongoose.model("Hq", HQSchema);

module.exports = HQModel;
