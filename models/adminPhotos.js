const mongoose = require("mongoose");

const schema = mongoose.Schema;

const photosSchema = new schema(
  {
    productId: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
    },
    photos: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adminphotos", photosSchema);
