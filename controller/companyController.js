const companyModel = require("../models/companyModel");

////////////////
///.............................................
const companySignup = async (req, res) => {
  try {
    const data = await companyModel.create({
      ...req.body,
    });
    res.status(200).json({
      message: " Company Registration Successfull",
      data,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    console.log(error);
  }
};

//.......................get company ....
const getCompany = async (req, res) => {
  const { id } = req.params;
  // const {id} = req.query
  try {
    const company = await companyModel.findById({ _id: id });
    if (!company) {
      return res
        .status(201)
        .json({ message: "No Such Data found", success: false });
    }

    res.status(200).json({ company, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////..........update company.......
const updateCompany = async (req, res) => {
  // const { id } = req.query;
  const { id } = req.params;
  const company = await companyModel.findById({ _id: id });
  if (!company) {
    return res
      .status(201)
      .json({ message: "No Such company found", success: false });
  }

  const update = {
    companyName:req.body.companyName ,
    province:req.body.province ,
    city: req.body.city,
    address: req.body.address,
    county:req.body.county ,
    phoneNumber: req.body.phoneNumber
  };

  const newcompany = await companyModel.findByIdAndUpdate(id, update, {
    new: true,
  });
  return res
    .status(200)
    .json({ message: "company Update Successfull", newcompany, success: true });
};

module.exports = {
  companySignup,
  getCompany,
  updateCompany
};
