const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const { transferProduct,addTranferProductPhotos , deleteTransferProductPhoto ,deleteTransferProductById ,updateTransferProducts} = require("../controller/ProductTransferController");

///routes//////

router.post("/transferproduct", checkAuth, transferProduct);
router.post("/addtransferphoto", checkAuth, addTranferProductPhotos);
router.delete("/deletetransferphoto", checkAuth, deleteTransferProductPhoto);
router.delete("/deletetransferproduct", checkAuth, deleteTransferProductById);
router.patch("/updatetransferproduct", checkAuth, updateTransferProducts);

module.exports = router;
