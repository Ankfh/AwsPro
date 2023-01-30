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

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("colleague", colleagueSchema);
