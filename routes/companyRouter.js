const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
    companySignup
 
} = require("../controller/companyController");

router.post("/companysignup", companySignup);


module.exports = router;
