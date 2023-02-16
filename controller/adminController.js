const adminPhotos = require("../models/adminPhotos");
const productModel = require("../models/productModel");
const { adminPhotosUpload } = require("../uploadFile/adminPhotosUpload");

const adminPhoto = async (req, res) => {
  const { productId, companyId } = req.body;

  try {
    const images = req.files.photos;
    var uploadPath = [];
    if (req.files.photos) {
      for (let i = 0; i < images.length; i++) {
        const uploadName = await adminPhotosUpload(images[i]);

        uploadPath.push({ path: uploadName });
      }
    } else {
      return res
        .status(201)
        .json({ message: "No Photo Found", success: false });
    }

    console.log(uploadPath);

    const newPhoto = JSON.stringify(uploadPath);

    const change = {
      status: "download",
    };

    const products = await adminPhotos.findOne({ productId: productId });
    if (products) {
      return res.status(201).json({
        message: "product already exist",

        success: false,
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: productId },
      change,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(201).json({
        message: "no product found",
        data,
        success: true,
      });
    }

    const data = await adminPhotos.create({
      productId,
      companyId,
      photos: newPhoto,
      productName: updatedProduct.productName,
    });
    res.status(200).json({
      message: " admin photo uploaded",
      data,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};

//...............get single photooooooooadmin
const getSingleAdminPhoto = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await adminPhotos.findOne({ productId: id });
    if (!products) {
      return res
        .status(201)
        .json({ message: "No Such Product found", success: false });
    }

    res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

module.exports = {
  adminPhoto,
  getSingleAdminPhoto,
};
