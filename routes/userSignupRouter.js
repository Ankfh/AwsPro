const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  userSignup,
  verifyEmail,
} = require("../controller/userController");

router.post("/register", userSignup);

module.exports = router;
