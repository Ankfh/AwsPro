const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  userLogin,
  userSignup,
  verifyEmail,
  getUser,
  updateUser

} = require("../controller/userController");

router.post("/register", userSignup);
router.post("/login", userLogin);
router.get("/getuser/:id", getUser);
router.patch("/updateuser/:id", updateUser);

module.exports = router;
