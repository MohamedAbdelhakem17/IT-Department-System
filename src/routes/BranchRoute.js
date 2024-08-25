const express = require("express");

const router = express.Router();

const { createBranch } = require("../controller/BranchController");

router.route("/").post(createBranch);

module.exports = router;
