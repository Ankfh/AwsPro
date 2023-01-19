const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ProductTransferShema = new schema(
  {
    customerCompanyName: {
      type: String,
      // required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerProductName: {
      type: String,
      // required: true,
    },
    customerProductDescription: {
      type: String,
    },
    productPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transferproducts", ProductTransferShema);
