const {
  productTransferPhotoDelete,
} = require("../DeleteFiles/productTransferPhotoDelete");
const ProdutTransferModel = require("../models/ProductTransferModel");
const {
  uploadTransferProductImage,
} = require("../uploadFile/productTransferPhotoUploads");

const nodemailer = require("nodemailer");

const transferProduct = async (req, res) => {
  const { id } = req.query;
  const {
    customerCompanyName,
    customerEmail,
    customerProductName,
    customerProductDescription,
    serialNumber,
    productPhoto,
    companyId,
    url,
  } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "mail.labd.tech",
      port: 465,
      auth: {
        user: "testing@labd.tech",
        pass: "theJungle@007",
      },
    });
    var mailOption = {
      from: "testing@labd.tech",
      to: "ashfaqnabi357@gmail.com",
      subject: "product URL",
      text: `${url}`,
    };

    const TransferProducts = new ProdutTransferModel({
      customerCompanyName,
      customerEmail,
      customerProductName,
      customerProductDescription,
      serialNumber,
      companyId,
      productPhoto,
    });

    await TransferProducts.save();

    await transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(200)
      .json({ message: "Product Transfer", TransferProducts, success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message, success: false });
  }
};

//***************Delete transfer product */
const deleteTransferProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const TransfeProducts = await ProdutTransferModel.findByIdAndDelete({
      _id: id,
    });
    if (!TransfeProducts) {
      return res
        .status(201)
        .json({ message: "No Such Product found", success: false });
    }

    res.status(200).json({ message: "Product Deleted", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

//^^^^^^^^^^get all transfer^^^^^^^^^^^
const getAllTransferProduct = async (req, res) => {
  try {
    const transferProduct = await ProdutTransferModel.find({}).sort({
      createdAt: -1,
    });
    if (!transferProduct) {
      return res
        .status(201)
        .json({ message: "No Product Found", success: false });
    }
    res.status(200).json({ transferProduct, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

//************update transfer product*** */
const updateTransferProducts = async (req, res) => {
  const { id } = req.query;
  const product = await ProdutTransferModel.findById({ _id: id });
  if (!product) {
    return res
      .status(201)
      .json({ message: "No Such Product found", success: false });
  }

  const change = {
    customerCompanyName: req.body.customerCompanyName,
    customerEmail: req.body.customerEmail,
    customerProductName: req.body.customerProductName,
    serialNumber: req.body.serialNumber,
    customerProductDescription: req.body.customerProductDescription,
    productPhoto: req.body.productPhoto,
  };

  const updatedProduct = await ProdutTransferModel.findByIdAndUpdate(
    id,
    change,
    {
      new: true,
    }
  );
  return res.status(200).json({
    message: "Transfer Product Update Successfull",
    updatedProduct,
    success: true,
  });
};

//*******************Add photo************** */
const addTranferProductPhotos = async (req, res) => {
  try {
    const { type } = req.body;

    const images = req.files.photo;
    var uploadPath;

    if (req.files.photo) {
      uploadPath = await uploadTransferProductImage(images);
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

//^^^^^^^^^^^^^^photo delete^^^^^^^^^^^^^^^^^^^^^^
const deleteTransferProductPhoto = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(201).json({ message: "Name is require", success: false });
  }
  try {
    await productTransferPhotoDelete(name);

    return res
      .status(200)
      .json({ message: "image deleted Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

///get single transferr............
const getSingleTransfer = async (req, res) => {
  const { id } = req.params;
  try {
    const transfer = await ProdutTransferModel.findById({ _id: id });
    if (!transfer) {
      return res
        .status(201)
        .json({ message: "No Such transfer Product found", success: false });
    }

    res.status(200).json({ transfer, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

module.exports = {
  transferProduct,
  getAllTransferProduct,
  addTranferProductPhotos,
  deleteTransferProductPhoto,
  deleteTransferProductById,
  updateTransferProducts,
  getSingleTransfer,
};
