const fs = require('fs');




exports.productBillsDelete = async (files) => {
  fs.unlink(`${process.env.PRODUCT_BILLS_PATH}/${files}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};