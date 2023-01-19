const productModel = require("../models/productModel");
const { productBilsUpload } = require("../uploadFile/productBilsUpload");
const { uploadProductImage } = require("../uploadFile/productPhotoUpload");
const fs = require("fs");
const { productPhotoDelete } = require("../DeleteFiles/productPhotoDelete");
const { productBillsDelete } = require("../DeleteFiles/productBillsDelete");

/////adddd productssssss
const addProduct = async (req, res) => {
  const { id } = req.query;
  const {
    productName,
    serialNumber,
    productDescription,
    productPhoto,
    goodsBill,
  } = req.body;
  try {
  
    const products = new productModel({
      productName,
      serialNumber,
      productDescription,
      productPhoto,
      goodsBill,
    });

    await products.save();

    res.status(200).json({ message: "Product Added", products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message, success: false });
  }
};

////get All product ///////////////
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productModel.find({}).sort({ createdAt: -1 });
    if (!allProduct) {
      return res
        .status(201)
        .json({ message: "No Product Found", success: false });
    }
    res.status(200).json({ allProduct, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

//////detete productssss   ///////////////////
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const products = await productModel.findByIdAndDelete({ _id: id });
    if (!products) {
      return res
        .status(201)
        .json({ message: "No Such Product found", success: false });
    }
    // const parseProductPhoto = JSON.parse(products.productPhoto);
    // const parseProductBill = JSON.parse(products.goodsBill);

    // await productPhotoDelete(parseProductPhoto);
    // await productBillsDelete(parseProductBill);

    res.status(200).json({ message: "Product Deleted", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////// update products ......................
const updateProducts = async (req, res) => {
  const { id } = req.query;
  const product = await productModel.findById({ _id: id });
  if (!product) {
    return res
      .status(201)
      .json({ message: "No Such Product found", success: false });
  }

  // const parseProductPhoto = JSON.parse(product.productPhoto);
  // const parseProductBill = JSON.parse(product.goodsBill);

  // if (req.files.photo) {
  //   const images = req.files.photo;
  //   await productPhotoDelete(parseProductPhoto);
  //   for (let i = 0; i < images.length; i++) {
  //     const uploadPath = await uploadProductImage(images[i]);
  //     imagePath.push(uploadPath);
  //   }
  // }
  // if (req.files.pdf.length > 0) {
  //   if (Array.isArray(req.files.pdf)) {
  //     // await productBillsDelete(parseProductBill);

  //     if (req.files.pdf) {
  //       for (let i = 0; i < pdfs.length; i++) {
  //         const uploadPath = await productBilsUpload(pdfs[i]);
  //         pdfPath.push(uploadPath);
  //       }
  //     }
  //   } else {
  //     const pdfs = req.files.pdf;

  //     const uploadPath = await productBilsUpload(pdfs);
  //     pdfPath.push(uploadPath);
  //   }
  // }

  // const imagesString = JSON.stringify(imagePath);
  const change = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    serialNumber: req.body.serialNumber,
    // productPhoto: imagesString,
    // goodsBill: pdfPath,
  };

  const newProduct = await productModel.findByIdAndUpdate(id, change, {
    new: true,
  });
  return res
    .status(200)
    .json({ message: "Product Update Successfull", newProduct, success: true });
};

/////Add product photo ........................
const addProductPhotos = async (req, res) => {
  try {
    const images = req.files.photo;

    const imagePath = [];
    if (req.files.photo) {
      const uploadPath = await uploadProductImage(images);
      imagePath.push(uploadPath);
    } else {
      return res
        .status(201)
        .json({ message: "No Photo Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "image added Successfull", imagePath, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////Delete Product Photo ...............
const deleteProductPhoto = async (req, res) => {
  const { name } = req.body;
  try {
    await productPhotoDelete(name);

    return res
      .status(200)
      .json({ message: "image deleted Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};
module.exports = {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProducts,
  addProductPhotos,
  deleteProductPhoto,
};
