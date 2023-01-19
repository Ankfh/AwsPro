const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productShema = new schema(
  {
    productName: {
      type: String,
      // required: true,
    },
    serialNumber: {
      type: String,
      // required: true,
    },
    productDescription: {
      type: String,
      // required: true,
    },
    productPhoto: {
      type: String,
    },
    goodsBill: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productShema);
