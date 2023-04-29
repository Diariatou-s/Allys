const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const maladie = require("../controllers/maladie");

router.post('/nouv_maladie', catchAsync(maladie.creationMaladie));

module.exports = router;