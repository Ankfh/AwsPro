const { productTransferPhotoDelete } = require("../DeleteFiles/productTransferPhotoDelete");
const ProdutTransferModel = require("../models/ProductTransferModel");
const { uploadTransferProductImage } = require("../uploadFile/productTransferPhotoUploads");

const transferProduct = async (req, res) => {
  const { id } = req.query;
  const {
    customerCompanyName,
    customerEmail,
    customerProductName,
    customerProductDescription,
  } = req.body;
  try {
    const TransferProducts = new ProdutTransferModel({
      customerCompanyName,
      customerEmail,
      customerProductName,
      customerProductDescription,
    });

    await TransferProducts.save();

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
    const TransfeProducts = await ProdutTransferModel.findByIdAndDelete({ _id: id });
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
    customerProductDescription: req.body.customerProductDescription,
    productPhoto: req.body.productPhoto
  };

  const updatedProduct = await ProdutTransferModel.findByIdAndUpdate(id, change, {
    new: true,
  });
  return res
    .status(200)
    .json({ message: "Transfer Product Update Successfull", updatedProduct, success: true });
};


//*******************Add photo************** */
const addTranferProductPhotos = async (req, res) => {
    try {
      const images = req.files.photo;
  
      const imagePath = [];
      if (req.files.photo) {
        const uploadPath = await uploadTransferProductImage(images);
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


//^^^^^^^^^^^^^^photo delete^^^^^^^^^^^^^^^^^^^^^^
const deleteTransferProductPhoto = async (req, res) => {
  const { name } = req.body;
  if(!name){
    return res
      .status(201)
      .json({ message: "Name is require", success: false });
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





module.exports = {
  transferProduct,
  addTranferProductPhotos,
  deleteTransferProductPhoto,
  deleteTransferProductById,
  updateTransferProducts
};
