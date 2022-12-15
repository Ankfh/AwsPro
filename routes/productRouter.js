const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const { addProduct ,getAllProduct,deleteProductById,updateProducts} = require("../controller/productController");


///routes//////

router.post("/addproduct",checkAuth , addProduct);
router.get("/getallproduct",checkAuth , getAllProduct);
router.delete("/deleteproduct",checkAuth , deleteProductById);
router.put("/updateproduct",checkAuth , updateProducts);

module.exports = router;
