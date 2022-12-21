const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const { addProduct ,getAllProduct,deleteProductById,updateProducts,addProductPhotos ,deleteProductPhoto} = require("../controller/productController");


///routes//////

router.post("/addproduct",checkAuth , addProduct);
router.get("/getallproduct",checkAuth , getAllProduct);
router.delete("/deleteproduct",checkAuth , deleteProductById);
router.put("/updateproduct",checkAuth , updateProducts);
router.post("/productphotoadd",checkAuth , addProductPhotos);
router.delete("/deleteproductphoto",checkAuth , deleteProductPhoto);

module.exports = router;
