const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const colleagueModel = require("../models/colleagueModel");

////////////////
///.............................................
const userSignup = async (req, res) => {
  console.log(req.body.companyId, "jj");
  try {
    let { email, password, userName, companyId, userType } = req.body;

    const hash = await signup(password);
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
      userType,
    });
    const token = createToken(user._id);

    res.status(200).json({
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

///...........get userr
const getUser = async (req, res) => {
  const { id } = req.params;
  // const {id} = req.query
  console.log(id);
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res
        .status(201)
        .json({ message: "No Such user found", success: false });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

///update user///////
const updateUser = async (req, res) => {
  // const { id } = req.query;
  const { email } = req.body;
  console.log(email, "emaillll");
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    return res
      .status(201)
      .json({ message: "No Such user found", success: false });
  }

  const update = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };

  const newuser = await User.findByIdAndUpdate(id, update, {
    new: true,
  });
  return res
    .status(200)
    .json({ message: "user Update Successfull", newuser, success: true });
};

const userLinkSignup = async (req, res) => {
  const { id } = req.params;
  try {
    let { email, password, userName, companyId, userType } = req.body;

    const hash = await signup(password);
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(201)
        .json({ message: "Email already exist", success: false });
    }
    const change = {
      status: "active",
      token: null
    };
    const user = await User.create({
      email,
      password: hash,
      userName,
      companyId,
      userType,
    });
    const token = createToken(user._id);

    const updateColleague = await colleagueModel.findByIdAndUpdate(
      { _id: id },
      change,
      { new: true }
    );

    res.status(200).json({
      message: "user signup Successfull",
      token,
      user,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message, success: false });
    // console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
  updateUser,
  userLinkSignup,
};
