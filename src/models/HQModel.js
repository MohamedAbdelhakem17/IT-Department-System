const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const HQModel = mongoose.model("Hq", HQSchema);

module.exports = HQModel;
