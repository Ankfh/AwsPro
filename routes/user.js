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
  userLinkSignup

} = require("../controller/userController");

router.post("/register", userSignup);
router.post("/login", userLogin);
router.get("/getuser/:id", getUser);
router.patch("/updateuser/:id", updateUser);
router.post("/userlinksignup/:id", userLinkSignup);

module.exports = router;
