const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {
  addColleague,
  getAllColleague,
  deleteColleague,
  updateColleague,
  verifyInvitation,
} = require("../controller/colleagueController");

router.post("/addcolleague", checkAuth, addColleague);
router.get("/getallcolleague/:companyId", checkAuth, getAllColleague);
router.delete("/deletecolleague", checkAuth, deleteColleague);
router.patch("/updatecolleague", checkAuth, updateColleague);
router.post("/verifyinvitation/:token", verifyInvitation);

module.exports = router;
