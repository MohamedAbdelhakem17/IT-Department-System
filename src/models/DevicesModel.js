const mongoose = require("mongoose");

const DeviceType = require("../config/deviceType");

const BaseDeviceSchema = new Schema(
  {
    model: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
    type: {
      type: String,
      enum: Object.values(DeviceType),
      required: true,
    },
  },
  { discriminatorKey: "type", _id: false }
);

const WorkStationSchema = new Schema({
  processor: { type: String, required: true },
  ip: {
    type: String,
  },
  mac: {
    type: String,
  },
  anyDesk: { type: String },
  graphicsCard: { type: String },
  ram: {
    brand: { type: String },
    capacity: { type: Number, required: true },
    type: {
      type: String,
      enum: ["DDR3", "DDR4", "DDR5"],
      required: true,
    },
    speed: { type: Number },
  },
  storage: {
    brand: { type: String },
    type: {
      type: String,
      enum: ["HDD", "SSD"],
      required: true,
    },
    capacity: { type: Number, required: true },
  },
  screenSize: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const ScreenSchema = new Schema({
  size: { type: Number, required: true },
  resolution: { type: String, required: true },
  relatedTo: { type: Schema.Types.ObjectId, ref: "Device" },
});

const PrinterSchema = new Schema({
  ip: { type: String },
  color: { type: Boolean, default: false },
  wireless: { type: Boolean, default: false },
});

const CashierPrinterSchema = new Schema({
  connectWith: { type: String, enum: ["Cashier", "Order Taker"] }, // Connected with a PC for Cashier or Order Taker
  connectivity: {
    type: String,
    enum: ["USB", "Bluetooth", "Ethernet"],
    required: true,
  },
});

const ScannerSchema = new Schema({
  model: { type: String, required: true },
  connectivity: {
    type: String,
    enum: ["USB", "Wireless"],
    required: true,
  },
});

const deviceSchema = new Mongoose.Schema({
  base: {
    type: BaseDeviceSchema,
    required: [true, "Basic Information Must be Insert"],
  },
  workStation: {
    type: WorkStationSchema,
  },
  screen: {
    type: ScreenSchema,
  },
  printer: {
    type: PrinterSchema,
  },
  cashierPrinter: {
    type: CashierPrinterSchema,
  },
  scanner: {
    type: ScannerSchema,
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
