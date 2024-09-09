const mongoose = require("mongoose");

const DeviceType = require("../config/itDevicesType");

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
    ref: "Branch",
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
      return [DeviceType.FINGERPRINT, DeviceType.Firewall].includes(this.type);
    },
  },

  ports: {
    type: Number,
    required: function () {
      return [DeviceType.ROUTER, DeviceType.DVR, DeviceType.FIREWALL].includes(
        this.type
      );
    },
  },
});

const ItDevice = mongoose.model("ItDevice", deviceSchema);

module.exports = ItDevice;
