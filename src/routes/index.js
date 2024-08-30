const branchRoute = require("./BranchRoute");

const amountRoutes = (app) => {
  app.use("/api/v1/branchs", branchRoute);
};

module.exports = amountRoutes;
