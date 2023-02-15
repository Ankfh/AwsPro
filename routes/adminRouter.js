const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middleware/checkAuth");

const {
    adminPhoto,
    getSingleAdminPhoto
} = require("../controller/adminController");

router.post("/addadminphoto", adminPhoto);
router.get("/getadminphoto/:id", getSingleAdminPhoto);

module.exports = router;
