const mongoose = require("mongoose");

const lineSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["we", "etisalat", "orange", "vodafone"],
    required: true,
  },
  type: {
    type: String,
    enum: ["4G", "landLine"],
    required: true,
  },
  userResponsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItStaff",
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  lineNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number
  },
});

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

    manger: {
      name: String,
      phone: String,
    },

    line: {
      type: lineSchema,
    },
  },
  { timestamps: true }
);

const BranchModel = mongoose.model("Branch", branchSchema);
module.exports = BranchModel;
