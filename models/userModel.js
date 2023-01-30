const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType:{
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
