const colleagueModel = require("../models/colleagueModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { baseUrl } = require("../baseUrl/baseUrl");

const addColleague = async (req, res) => {
  const companyId = req.body.companyId;
  const emials = JSON.parse(req.body.email);

  let transporter = nodemailer.createTransport({
    host: "mail.labd.tech",
    port: 465,
    auth: {
      user: "testing@labd.tech",
      pass: "theJungle@007",
    },
  });
  for (let i = 0; i < emials.length; i++) {
    const newToken = createToken(emials[i]);
    const check = await colleagueModel.findOne({ email: emials[i] });
    console.log(check, "chck");
    if (check) {
      continue;
    }
    try {
      const colleague = new colleagueModel({
        email: emials[i],
        token: newToken,
        companyId,
      });

      console.log(colleague);

      await colleague.save();
      console.log(colleague);

      var mailOption = {
        from: "testing@labd.tech",
        to: `${emials[i]}`,
        subject: "product URL",
        text: `${baseUrl}/usersignup/${newToken}`,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const colleagues = await colleagueModel.find({ companyId });
  // console.log(colleagues);

  res
    .status(200)
    .json({ message: "colleague Added", colleagues, success: true });
};

const getAllColleague = async (req, res) => {
  try {
    const allColleague = await colleagueModel.find({}).sort({ createdAt: -1 });
    if (!allColleague) {
      return res
        .status(201)
        .json({ message: "No Colleague Found", success: false });
    }
    res.status(200).json({ allColleague, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

const deleteColleague = async (req, res) => {
  try {
    const { id } = req.query;
    const Colleague = await colleagueModel.findByIdAndDelete({ _id: id });
    if (!Colleague) {
      return res
        .status(201)
        .json({ message: "No Such Colleague found", success: false });
    }

    res.status(200).json({ message: "Colleague Deleted", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

const updateColleague = async (req, res) => {
  const { id } = req.query;
  const Colleague = await colleagueModel.findById({ _id: id });
  if (!Colleague) {
    return res
      .status(201)
      .json({ message: "No Such Colleague found", success: false });
  }

  const change = {
    email: req.body.email,
  };

  const newColleague = await colleagueModel.findByIdAndUpdate(id, change, {
    new: true,
  });
  return res.status(200).json({
    message: "Product Update Successfull",
    newColleague,
    success: true,
  });
};

//'''''''''colleague invitation..............
const verifyInvitation = async (req, res) => {
  const { token } = req.params;
  const newToken = await jwt.verify(token, process.env.JWT_SECRET);
  if (!newToken) {
    return res.status(201).json({ message: "invalid Link", success: false });
  }

  const update = {
    status: "active",
  };

  const userInfo = await colleagueModel.findOne({ email: newToken._id });
  console.log(userInfo)
  if (userInfo.status === "active") {
    return res
      .status(201)
      .json({ message: "user already activated", success: false });
  }

  const data = await colleagueModel.findOneAndUpdate(
    { email: newToken._id },
    update,
    {
      new: true,
    }
  );
  if (!data) {
    return res
      .status(201)
      .json({ message: "no such colleague found", success: false });
  }

  res.status(200).json({ message: "user activated", success: false });
};

module.exports = {
  addColleague,
  getAllColleague,
  deleteColleague,
  updateColleague,
  verifyInvitation,
};
