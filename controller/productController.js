const productModel = require("../models/productModel");
const { productBilsUpload } = require("../uploadFile/productBilsUpload");
const { uploadProductImage } = require("../uploadFile/productPhotoUpload");
const fs = require("fs");
const { productPhotoDelete } = require("../DeleteFiles/productPhotoDelete");
const { productBillsDelete } = require("../DeleteFiles/productBillsDelete");

/////adddd productssssss
const addProduct = async (req, res) => {
  const { productName, serialNumber, productDescription, productPhoto } =
    req.body;
  try {
    const images = req.files.photo;
    const pdfs = req.files.pdf;

    const pdfPath = [];
    const imagePath = [];
    if (req.files.photo) {
      for (let i = 0; i < images.length; i++) {
        const uploadPath = await uploadProductImage(images[i]);
        imagePath.push(uploadPath);
      }
    }

    if (Array.isArray(pdfs)) {
      if (req.files.pdf) {
        for (let i = 0; i < pdfs.length; i++) {
          const uploadPath = await productBilsUpload(pdfs[i]);
          pdfPath.push(uploadPath);
        }
      }
    } else {
      const uploadPath = await productBilsUpload(pdfs);
      pdfPath.push(uploadPath);
    }
    const imagesString = JSON.stringify(imagePath);
    const pdfString = JSON.stringify(pdfPath);
    const products = new productModel({
      productName,
      serialNumber,
      productDescription,
      productPhoto: imagesString,
      goodsBill: pdfString,
    });

    const result = products.save();
    if (!result) {
      return res.status(201).json({ message: "some problem", success: false });
    }

    res.status(200).json({ message: "Product Added", success: true });
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
    const parseProductPhoto = JSON.parse(products.productPhoto);
    const parseProductBill = JSON.parse(products.goodsBill);

    await productPhotoDelete(parseProductPhoto);
    await productBillsDelete(parseProductBill);

    res.status(200).json({ message: "Product Deleted", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////// update products ......................
const updateProducts = async (req, res) => {
  const { id } = req.query;
  const imagePath = [];
  const pdfPath = [];

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

module.exports = {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProducts,
};
