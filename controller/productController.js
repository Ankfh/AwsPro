const productModel = require("../models/productModel");
const { productBilsUpload } = require("../uploadFile/productBilsUpload");
const { uploadProductImage } = require("../uploadFile/productPhotoUpload");
const fs = require("fs");
const { productPhotoDelete } = require("../DeleteFiles/productPhotoDelete");
const { productBillsDelete } = require("../DeleteFiles/productBillsDelete");

/////adddd productssssss
const addProduct = async (req, res) => {
  const {
    productName,
    serialNumber,
    productDiscription,
    productPhoto,
    goodsBill,
    companyId,
  } = req.body;
  try {
    const products = new productModel({
      productName,
      serialNumber,
      productDescription:productDiscription,
      productPhoto,
      goodsBill,
      companyId,
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
    const companyId = req.params.companyId;
    const allProduct = await productModel.find({companyId}).sort({ createdAt: -1 });
    if (!allProduct) {
      return res
        .status(201)
        .json({ message: "No Product Found", success: false });
    }
    res.status(200).json({ allProduct, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

////get single product by id //////
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productModel.findById({ _id: id });
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
  const { id } = req.params;
  const product = await productModel.findById({ _id: id });
  if (!product) {
    return res
      .status(201)
      .json({ message: "No Such Product found", success: false });
  }

  // const parseProductPhoto = JSON.parse(product.productPhoto);
  // const parseProductBill = JSON.parse(product.goodsBill);

  // if (req.files.photo) {
  //   const pdf = req.files.photo;
  //   await productPhotoDelete(parseProductPhoto);
  //   for (let i = 0; i < pdf.length; i++) {
  //     const uploadPath = await uploadProductImage(pdf[i]);
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

  // const pdfString = JSON.stringify(imagePath);
  const change = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    serialNumber: req.body.serialNumber,
    productUrl: req.body.productUrl
    // productPhoto: pdfString,
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
    const { type } = req.body;
    const images = req.files.photo;
    var uploadPath;
    if (req.files.photo) {
      uploadPath = await uploadProductImage(images);
    } else {
      return res
        .status(201)
        .json({ message: "No Photo Found", success: false });
    }

    return res.status(200).json({
      message: "image added Successfull",
      uploadPath,
      type,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

////Delete Product Photo ...............
const deleteProductPhoto = async (req, res) => {
  const { name } = req.body;
  try {
    if(!name){
      
    return res
    .status(201)
    .json({ message: "Name is require", success: false });
    }
    await productPhotoDelete(name);

    return res
      .status(200)
      .json({ message: "image deleted Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

//"""""""""""""""""""""""'add billsssss;;;;;;;;;;;;"
const addBills = async (req, res) => {
  try {
    const pdf = req.files.pdf;
    var uploadPath;
    if (req.files.pdf) {
      uploadPath = await productBilsUpload(pdf);
    } else {
      return res
        .status(201)
        .json({ message: "No Bills Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Bills added Successfull", uploadPath, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

//""""""""""Delete Bills"""""""""""""
const deleteBills = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    await productBillsDelete(name);

    return res
      .status(200)
      .json({ message: "Bill deleted Successfull", success: true });
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
  addBills,
  deleteBills,
  getSingleProduct,
};
