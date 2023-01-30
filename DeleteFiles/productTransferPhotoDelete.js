const fs = require("fs");
exports.productTransferPhotoDelete = async (files) => {
  fs.unlink(`${process.env.TRANFER_IMAGE_PATH}/${files}`, (err) => {
      if (err) {
        return err
      }
      return 
    });
  };