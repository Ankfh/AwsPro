const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
  addProduct,
  getAllProduct,
  deleteProductById,
  updateProducts,
  addProductPhotos,
  deleteProductPhoto,
  addBills,
  deleteBills,
  getSingleProduct
} = require("../controller/productController");

///routes//////

router.post("/addproduct", checkAuth, addProduct);
router.get("/getallproduct", checkAuth, getAllProduct);
router.delete("/deleteproduct", checkAuth, deleteProductById);
router.put("/updateproduct", checkAuth, updateProducts);
router.post("/productphotoadd", checkAuth, addProductPhotos);
router.delete("/deleteproductphoto", checkAuth, deleteProductPhoto);
router.post("/addbills", checkAuth, addBills);
router.delete("/deletebills", checkAuth, deleteBills);
router.get("/getsingleproduct/:id", checkAuth, getSingleProduct);

module.exports = router;
