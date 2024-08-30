const mongoose = require("mongoose");

const itStaffSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "It Staff Code is required. "],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "IT staff name is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "IT staff email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    nationalId: {
      type: String,
      unique: true,
      required: [true, "National ID is required."],
    },
    imageForNationalId: String,
    birthday: Date,
    role: String,
  },
  { timestamps: true }
);

const ItStaffModel = mongoose.model("ItStaff", itStaffSchema);
module.exports = ItStaffModel;
