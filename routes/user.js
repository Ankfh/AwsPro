const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  userLogin,
  userSignup,
  verifyEmail,
  getUser,
  updateUser,
  userLinkSignup,
  passwordResetLink,
  verifyResetPassword,
  changePassword,
  deleteAccount
} = require("../controller/userController");

router.post("/register", userSignup);
router.post("/login", userLogin);
router.get("/getuser/:id", getUser);
router.patch("/updateuser/:id", updateUser);
router.post("/userlinksignup/:id", userLinkSignup);
router.post("/resetPasswordLink", passwordResetLink);
router.get("/verifypasswordlink/:token", verifyResetPassword);
router.post("/changepassword/:id", changePassword);
router.post("/deluser", deleteAccount);


module.exports = router;
