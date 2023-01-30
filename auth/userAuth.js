const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const validator = require("validator");
const emailvalidator = require("email-validator");

//function for creating user token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

//fuction for password encrypt and email check
const signup = async (password) => {
  

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
//.................................................
//function for user check to login
const signin = async (email, password) => {
  const user = await User.findOne({ email });

  // if (!user) {
  //   throw Error("Incorrect Email");
  // }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password Incorrect");
  }
  return user;
};

module.exports = {
  signin,
  signup,
  createToken,
};
