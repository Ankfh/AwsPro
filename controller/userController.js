const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

////////////////
///.............................................
const userSignup = async (req, res) => {
  try {
    let { email, password, userName, companyId } = req.body;

    const hash = await signup(email, password, userName);
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(201)
        .json({ message: "Email already exist", success: false });
    }

    const user = await User.create({
      email,
      password: hash,
      userName,
      companyId,
    });
    const token = createToken(user._id);

    res
      .status(200)
      .json({
        message: "Registration Successfull",
        token,
        user,
        success: true,
      });
  } catch (error) {
    return res.status(401).json({ error: error.message, success: false });
    // console.log(error);
  }
};

////user login ....................................
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await signin(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(201)
        .json({ message: "Email not exist", success: false });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(201)
        .json({ message: "Password Incorrect", success: false });
    }

    //create token..
    const token = createToken(user._id);

    res
      .status(200)
      .json({ message: "Login Successfull", user, token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
};
