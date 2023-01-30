const companyModel = require("../models/companyModel");

////////////////
///.............................................
const companySignup = async (req, res) => {
  try {
              
   const data= await companyModel.create({
        ...req.body
    });
    res
      .status(200)
      .json({ message: " Company Registration Successfull",data, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    console.log(error);
  }
};


module.exports = {
  companySignup
}