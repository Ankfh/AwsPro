const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const { transferProduct,addTranferProductPhotos , deleteTransferProductPhoto ,deleteTransferProductById ,updateTransferProducts,getAllTransferProduct,getSingleTransfer ,updateTransferPhoto} = require("../controller/ProductTransferController");

///routes//////

router.post("/transferproduct", checkAuth, transferProduct);
router.post("/addtransferphoto", checkAuth, addTranferProductPhotos);
router.delete("/deletetransferphoto", checkAuth, deleteTransferProductPhoto);
router.delete("/deletetransferproduct", checkAuth, deleteTransferProductById);
router.patch("/updatetransferproduct/:id", checkAuth, updateTransferProducts);
router.get("/getalltransfer", checkAuth, getAllTransferProduct);
router.get("/getsingletransfer/:id", checkAuth, getSingleTransfer);
router.post("/updatetransferphoto", checkAuth, updateTransferPhoto);


module.exports = router;
