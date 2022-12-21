const fs = require("fs");

// exports.productPhotoDelete = async (files) => {
//   if (files.length > 0) {
//     for (let i = 0; i < files.length; i++) {
//       fs.unlink(`${process.env.PRODUCT_IMAGE_PATH}/${files[i]}`, (err) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//       });
//     }
//   }
// };

exports.productPhotoDelete = async (files) => {
  fs.unlink(`${process.env.PRODUCT_IMAGE_PATH}/${files}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
