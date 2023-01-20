const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

////////////////
///.............................................
const userSignup = async (req, res) => {
  try {
    let { email, password, userName } = req.body;

    var transport = nodemailer.createTransport({
      host: "mail.labd.tech",
      port: 465,
      auth: {
        user: "testing@labd.tech",
        pass: "theJungle@007",
      },
    });

    const hash = await signup(email, password, userName);

    await User.create({
      email,
      password: hash,
      userName,
    });

    const user = await User.findOne({ email });
    const newToken = createToken(user._id);

    const change = {
      token: newToken,
    };
    await User.findByIdAndUpdate(user._id, change, { new: true });

    const mailOptions = {
      from: "testing@labd.tech",
      to: "ashfaqnabi357@gmail.com",
      subject: "helooggggg",
      text: `${process.env.BASE_URL}/api/user/verify/${user._id}/${newToken}`,
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(user, "klkl");
    res
      .status(200)
      .json({ message: "Registration Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    // console.log(error);
  }
};

///*****vefifyyyyyyyy */
const verifyEmail = async (req, res) => {
  const { id, token } = req.params;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decode;
    const newId = _id
    const user = await User.findById(_id);
    if (!user) {
      return res.status(202).json({ message: "Invalid link", success: false });
    }

    res
      .status(200)
      .json({ message: "email verified sucessfully", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////user login ....................................
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signin(email, password);

    //create token..
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "Login Successfull", token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  verifyEmail,
};
