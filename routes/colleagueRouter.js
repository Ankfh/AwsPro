const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const { addColleague ,getAllColleague,deleteColleague,updateColleague} = require("../controller/colleagueController");

router.post("/addcolleague", checkAuth, addColleague);
router.get("/getallcolleague", checkAuth, getAllColleague);
router.delete("/deletecolleague", checkAuth, deleteColleague);
router.patch("/updatecolleague", checkAuth, updateColleague);

module.exports = router;
