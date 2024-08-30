const mongoose = require("mongoose");

const DeviceType = require("../config/itDevicesType");

// Define a single schema for all devices
const deviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(DeviceType),
    required: true,
  },

  ipAddress: {
    type: String,
    required: function () {
      return [
        DeviceType.FINGERPRINT,
        DeviceType.ROUTER,
        DeviceType.Firewall,
        DeviceType.CAMERA,
      ].includes(this.type);
    },
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    rev: "Branch",
  },

  model: {
    type: String,
    required: function () {
      return [
        DeviceType.FINGERPRINT,
        DeviceType.ROUTER,
        DeviceType.Firewall,
      ].includes(this.type);
    },
  },

  number: {
    type: Number,
    unique: function () {
      return this.type === DeviceType.CAMERA;
    },
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: function () {
      // Status field required for specific types of devices
      return [DeviceType.FINGERPRINT, DeviceType.Firewall].includes(this.type);
    },
  },

  ports: {
    type: Number,
    required: function () {
      return [DeviceType.ROUTER, DeviceType.DVR].includes(this.type);
    },
  },
});

// Create a model for the schema
const ItDevice = mongoose.model("ItDevice", deviceSchema);

module.exports = ItDevice;
