const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ message: "User  not found", success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "User  not found", success: false });
    }
    req.id = id;
    next();
  });
};

module.exports = authToken;
