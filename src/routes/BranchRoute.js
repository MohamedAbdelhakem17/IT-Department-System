const express = require("express");

const router = express.Router();

const {
  createBranch,
  getBranches,
  getBranch,
  updateBranchName,
  updateBranchLineData,
  updateBranchDevices,
  deleteBranchDevice,
} = require("../controller/BranchController");

router.route("/").get(getBranches).post(createBranch);
router.route("/:id").get(getBranch).put(updateBranchName);
router.put("/line/:id", updateBranchLineData);

router
  .route("/:id/device/:deviceId")
  .put(updateBranchDevices)
  .delete(deleteBranchDevice);

module.exports = router;
