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
      ref: "Hq",
    },

    workInHq: {
      type: Boolean
    } , 

    shift: {
      type: String,
      enum: ["morning", "night", "unknown"],
      default: "unknown",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        delete ret.user;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        delete ret.user;
      },
    }
  }
);

employeeSchema.virtual("device", {
  ref: "Device",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
