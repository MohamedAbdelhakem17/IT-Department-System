const mongoose = require("mongoose");

const deviceType = require("../config/deviceType");
const itDeviceType = require("../config/itDevicesType");

const deviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(deviceType),
    required: true,
  },

  ip: {
    type: String,
    required: false,
  },

  mac: {
    type: String,
    required: false,
  },
  anydesk: {
    type: String,
    required: false,
  },
  graphicsCard: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
  ram: {
    brand: {
      type: String,
      required: false,
    },
    capacity: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    speed: {
      type: String,
      required: false,
    },
    number: {
      type: Number,
      required: false,
    },
  },
  hard: {
    type: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    capacity: {
      type: String,
      required: false,
    },
  },
});

const itDeviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(itDeviceType),
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  ports: {
    type: Number,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
});

const stockSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Device", "IT Device"],
  },
  device: {
    type: deviceSchema,
  },
  itDevice: {
    type: itDeviceSchema,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = { Stock, Device, ITDevice };
