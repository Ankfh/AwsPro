const mongoose = require("mongoose");

const schema = mongoose.Schema;

const companySchema = new schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    county: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("company", companySchema);
