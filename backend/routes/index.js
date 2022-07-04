const express = require("express")
const { addBalance, getBalance } = require("../controllers/v1/canteen_balance_box_controller.js");
const { register, login, logout } = require('../controllers/user_controller.js');
const { refreshToken } = require('../controllers/v1/token_controller.js');
const { getProducts } = require("../controllers/v1/product_controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const router = express.Router();

// Balance Canteen Box
router.post("/api/v1/balance", verifyToken, addBalance);
router.get("/api/v1/balance", getBalance);

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// Product
router.get("/api/v1/products", getProducts);

// Token
router.get('/token', refreshToken);

module.exports = router;