const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
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
    pass: "theJungle@007"
  }
});

    const mailOptions = {
      from: "testing@labd.tech",
      to: "ashfaqnabi357@gmail.com",
      subject: "helooggggg",
      text: `hello wold gggggg`,
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // transport.verify(function(error, success) {
    //   if (error) {
    //         console.log(error);
    //   } else {
    //         console.log('Server is ready to take our messages');
    //   }
    // });

    const hash = await signup(email, password, userName);


    await User.create({
      email,
      password: hash,
      userName,
    });
    res
      .status(200)
      .json({ message: "Registration Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    // console.log(error);
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
};
