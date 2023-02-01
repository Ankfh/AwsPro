const mongoose = require("mongoose");

const schema = mongoose.Schema;

const colleagueSchema = new schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    companyId: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    type: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("colleague", colleagueSchema);
