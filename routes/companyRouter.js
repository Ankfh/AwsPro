const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  companySignup,
  getCompany,
  updateCompany,
} = require("../controller/companyController");

router.post("/companysignup", companySignup);
router.get("/getcompany/:id", getCompany);
router.patch("/updatecompany/:id", updateCompany);

module.exports = router;
