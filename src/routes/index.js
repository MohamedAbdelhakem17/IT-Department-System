const branchRoute = require("./BranchRoute");
const HQRoute = require("./HqRoute");
const ItStaffRoute = require("./ItStaffRoute");
const EmployeeRout = require("./EmployeeRoute")

const amountRoutes = (app) => {
  app.use("/api/v1/branchs", branchRoute);
  app.use("/api/v1/departments", HQRoute);
  app.use("/api/v1/auth", ItStaffRoute);
  app.use("/api/v1/employee", EmployeeRout);
};

module.exports = amountRoutes;
