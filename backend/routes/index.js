const express = require("express")
const { addBalance } = require("../controllers/v1/canteen_balance_box_controller.js");
const router = express.Router();

// Balance Canteen Box
router.get("/balance", addBalance);

module.exports = router;