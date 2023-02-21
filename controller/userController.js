const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const colleagueModel = require("../models/colleagueModel");
const { baseUrl } = require("../baseUrl/baseUrl");

////////////////
///.............................................
const userSignup = async (req, res) => {
  console.log(req.body.companyId, "jj");
  try {
    let { email, password, userName, companyId, userType } = req.body;

    const hash = await signup(password);
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(201).json({
        message: "Email already exist",
        type: "email",
        success: false,
      });
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
        .json({ message: "Email not exist", type: "email", success: false });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({
        message: "Password Incorrect",
        type: "password",
        success: false,
      });
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

  
  if (req.body.email) {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(201)
        .json({ message: "This email is already exist", type: 'email', success: false });
    }
  }
  var update = null;
  if (req.body.userName) {
    update = {
      userName: req.body.userName,
    };
  } else if (req.body.email) {
    update = {
      email: req.body.email,
    };
  } else if (req.body.password) {
    const hash = await signup(req.body.password);
    update = {
      password: hash,
    };
  }

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
      return res.status(201).json({
        message: "Email already exist",
        type: "email",
        success: false,
      });
    }
    const change = {
      status: "active",
      token: null,
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

/// send password reset link ..///////////////
const passwordResetLink = async (req, res) => {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    host: "mail.labd.tech",
    port: 465,
    auth: {
      user: "testing@labd.tech",
      pass: "theJungle@007",
    },
  });

  try {
    const newToken = await createToken(email);
    const change = {
      token: newToken,
    };
    const check = await User.findOne({ email: email });
    if (!check) {
      return res
        .status(200)
        .json({ message: "No such user found", type: "email", success: false });
    }

    var mailOption = {
      from: "testing@labd.tech",
      to: `${email}`,
      subject: "product URL",
      text: `${baseUrl}/passwordvarification/${newToken}`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await User.findOneAndUpdate({ email: email }, change, { new: true });

    res.status(200).json({ message: "link send to your email", success: true });
  } catch (error) {
    console.log(error);
  }
};

///.....verify reset password link ...........
const verifyResetPassword = async (req, res) => {
  const { token } = req.params;
  try {
    const saveToken = await User.findOne({ token: token });
    if (!saveToken) {
      return res.status(201).json({ message: "invalid link", success: false });
    }
    const newToken = await jwt.verify(
      saveToken.token,
      process.env.JWT_SECRET,
      (err, id) => {
        if (err) {
          console.log("eroor");
          return false;
        }
        return id;
      }
    );

    const userInfo = await User.findOne({ email: newToken._id });
    if (!userInfo) {
      return res.status(201).json({ message: "invalid link", success: false });
    }

    res.status(200).json({ message: "link verified", userInfo, success: true });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: "something went wrong", success: false });
  }
};

///...........................
const changePassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  try {
    const userData = await User.findById({ _id: id });
    if (!userData) {
      return res
        .status(202)
        .json({ message: "user not found", success: false });
    }
    const hash = await signup(password);
    const change = {
      password: hash,
      token: null,
    };

    const updateData = await User.findByIdAndUpdate({ _id: id }, change, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Password Change successfully", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

const deleteAccount = async (req, res) => {
  const { userId } = req.body;
  const userData = await User.findById({ _id: userId });
  if (userData) {
    const result = await User.deleteOne({ _id: userId });
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ message: "User Deleted successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ error: "Something went wrong", success: false });
    }
  } else {
    return res
      .status(404)
      .json({ error: "Something went wrong", success: false });
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
  updateUser,
  userLinkSignup,
  passwordResetLink,
  verifyResetPassword,
  changePassword,
  deleteAccount,
};
