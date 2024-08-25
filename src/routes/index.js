const branchRoute = require("./BranchRoute");

const amountRoutes = (app) => {
  app.use("/api/v1/branch", branchRoute);
};

module.exports = amountRoutes;
