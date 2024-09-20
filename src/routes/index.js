const branchRoute = require("./BranchRoute");
const HQRoute = require("./HqRoute");
const ItStaffRoute = require("./ItStaffRoute");

const amountRoutes = (app) => {
  app.use("/api/v1/branchs", branchRoute);
  app.use("/api/v1/departments", HQRoute);
  app.use("/api/v1/auth", ItStaffRoute);
};

module.exports = amountRoutes;
