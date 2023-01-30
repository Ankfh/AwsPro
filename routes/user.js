const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  userLogin,
  userSignup,
  verifyEmail,
} = require("../controller/userController");

router.post("/register", userSignup);
router.post("/login", userLogin);

module.exports = router;
