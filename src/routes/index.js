const branchRoute = require("./BranchRoute");
const HQRoute = require("./HqRoute");

const amountRoutes = (app) => {
  app.use("/api/v1/branchs", branchRoute);
  app.use("/api/v1/departments", HQRoute);
};

module.exports = amountRoutes;
