exports.uploadProductImage = async (file) => {
  const filestore = Date.now() + "." + file.name.slice(-3);
  const path = `${process.env.PRODUCT_IMAGE_PATH}/${filestore}`;
  file.mv(path, (err) => {
    if (err) {
      return err;
    }
  });
  return filestore;
};
