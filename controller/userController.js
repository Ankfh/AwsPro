const User = require("../models/userModel");
const { signin, signup, createToken } = require("../auth/userAuth");

////////////////
///.............................................
const userSignup = async (req, res) => {
  try {
    let { email, password, userName } = req.body;
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
      .json({ message: "Login Successfull", token,  success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};



module.exports = {
  userSignup,
  userLogin,
 
};
