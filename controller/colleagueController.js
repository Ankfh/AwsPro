const colleagueModel = require("../models/colleagueModel");
const { signin, signup, createToken } = require("../auth/userAuth");
const addColleague = async (req, res) => {
  const { email, token } = req.body;
  const newToken = createToken(email);

  try {
    const colleague = new colleagueModel({
      email,
      token: newToken,
    });

    await colleague.save();

    res
      .status(200)
      .json({ message: "colleague Added", colleague, success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message, success: false });
  }
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
  return res
    .status(200)
    .json({
      message: "Product Update Successfull",
      newColleague,
      success: true,
    });
};

module.exports = {
  addColleague,
  getAllColleague,
  deleteColleague,
  updateColleague,
};
