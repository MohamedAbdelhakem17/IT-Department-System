const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const itStaffSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: [true, "It Staff Code is required. "],
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "IT staff name is required."],
    },
    username: {
      lowercase: true,
      type: String,
      unique: true,
      required: [true, "IT staff user name is required."],
      match: [
        /^[a-z0-9_]{6,}$/,
        "Invalid name: use at least 6 characters, lowercase letters, and underscores only.",
      ],
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
    token: String,
  },
  { timestamps: true }
);

itStaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const ItStaffModel = mongoose.model("ItStaff", itStaffSchema);
module.exports = ItStaffModel;
