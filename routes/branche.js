const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const branche = require("../controllers/branche");

router.post('/nouv_branche', catchAsync(branche.creationBranche));

module.exports = router;