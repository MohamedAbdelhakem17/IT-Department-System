// const mongoose = require("mongoose");
// const DeviceType = require("../config/deviceType");

// const BaseDeviceSchema = new mongoose.Schema(
//   {
//     model: { type: String, required: true },
//     name: { type: String, required: true },
//     type: {
//       type: String,
//       enum: Object.values(DeviceType),
//       required: true,
//     },
//     workLocation: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: "workLocationModel",
//       required: true,
//     },
//     workLocationModel: {
//       type: String,
//       required: true,
//       enum: ["Hq", "Branch"],
//     },
//     deparment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Hq",
//     },
//     branch: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//     },
//   },
//   { discriminatorKey: "type", _id: false }
// );

// const WorkStationSchema = new mongoose.Schema({
//   processor: { type: String, required: true },
//   ip: {
//     type: String,
//   },
//   mac: {
//     type: String,
//   },
//   anyDesk: { type: String },
//   graphicsCard: { type: String },
//   ram: {
//     brand: { type: String },
//     capacity: { type: Number, required: true },
//     type: {
//       type: String,
//       enum: ["DDR3", "DDR4", "DDR5"],
//       required: true,
//     },
//     speed: { type: Number },
//   },
//   storage: {
//     brand: { type: String },
//     type: {
//       type: String,
//       enum: ["HDD", "SSD"],
//       required: true,
//     },
//     capacity: { type: Number, required: true },
//   },
//   screenSize: { type: Number, required: true },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Employee",
//     required: true,
//   },
// });

// const ScreenSchema = new mongoose.Schema({
//   size: { type: Number, required: true },
//   resolution: { type: String, required: true },
//   relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
// });

// const PrinterSchema = new mongoose.Schema({
//   ip: { type: String },
//   color: { type: Boolean, default: false },
//   wireless: { type: Boolean, default: false },
// });

// const CashierPrinterSchema = new mongoose.Schema({
//   connectWith: { type: String, enum: ["Cashier", "Order Taker"] },
//   connectivity: {
//     type: String,
//     enum: ["USB", "Bluetooth", "Ethernet"],
//     required: true,
//   },
// });

// const ScannerSchema = new mongoose.Schema({
//   model: { type: String, required: true },
//   connectivity: {
//     type: String,
//     enum: ["USB", "Wireless"],
//     required: true,
//   },
// });

// const deviceSchema = new mongoose.Schema({
//   base: {
//     type: BaseDeviceSchema,
//   },
//   workStation: {
//     type: WorkStationSchema,
//   },
//   screen: {
//     type: ScreenSchema,
//   },
//   printer: {
//     type: PrinterSchema,
//   },
//   cashierPrinter: {
//     type: CashierPrinterSchema,
//   },
//   scanner: {
//     type: ScannerSchema,
//   },
// });

// const DeviceModel = mongoose.model("Device", deviceSchema);

// module.exports = DeviceModel;
const mongoose = require("mongoose");
const DeviceType = require("../config/deviceType");

// Base Schema for all devices
const BaseDeviceSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(DeviceType),
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hq",
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  },
  { discriminatorKey: "type", timestamps: true }
);

// Model for WorkStation devices
const WorkStationSchema = new mongoose.Schema({
  processor: { type: String, required: true },
  ip: { type: String },
  mac: { type: String },
  anyDesk: { type: String },
  graphicsCard: { type: String },
  ram: {
    brand: { type: String },
    capacity: { type: Number, required: true },
    type: { type: String, enum: ["DDR3", "DDR4", "DDR5"], required: true },
    speed: { type: Number },
  },
  storage: {
    brand: { type: String },
    type: { type: String, enum: ["HDD", "SSD"], required: true },
    capacity: { type: Number, required: true },
  },
  screenSize: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
});

// Model for Screen devices
const ScreenSchema = new mongoose.Schema({
  size: { type: Number, required: true },
  resolution: { type: String, required: true },
  relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

// Model for Printer devices
const PrinterSchema = new mongoose.Schema({
  ip: { type: String },
  color: { type: Boolean, default: false },
  wireless: { type: Boolean, default: false },
});

// Model for CashierPrinter devices
const CashierPrinterSchema = new mongoose.Schema({
  connectWith: { type: String, enum: ["Cashier", "Order Taker"] },
  connectivity: {
    type: String,
    enum: ["USB", "Bluetooth", "Ethernet"],
    required: true,
  },
});

// Model for Scanner devices
const ScannerSchema = new mongoose.Schema({
  connectivity: {
    type: String,
    enum: ["USB", "Wireless"],
    required: true,
  },
});

// Base device model
const DeviceModel = mongoose.model("Device", BaseDeviceSchema);

// Discriminators for each device type
const WorkStationModel = DeviceModel.discriminator("WorkStation", WorkStationSchema);
const ScreenModel = DeviceModel.discriminator("Screen", ScreenSchema);
const PrinterModel = DeviceModel.discriminator("Printer", PrinterSchema);
const CashierPrinterModel = DeviceModel.discriminator("CashierPrinter", CashierPrinterSchema);
const ScannerModel = DeviceModel.discriminator("Scanner", ScannerSchema);

module.exports = {
  DeviceModel,
  WorkStationModel,
  ScreenModel,
  PrinterModel,
  CashierPrinterModel,
  ScannerModel,
};
