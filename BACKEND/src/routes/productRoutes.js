const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardProducts,
  getMonthlySalesSummary,
} = require("../controllers/productController");

router.get("/dashboard", getDashboardProducts);
router.get("/sales-summary", getMonthlySalesSummary);

// GET semua produk
router.get("/", getProducts);

// POST semua produk
router.post("/", upload.single("gambar"), createProduct);

// GET produk berdasarkan ID
router.get("/:id", getProduct);

//UPDATE produk
router.put("/:id", upload.single("gambar"), updateProduct);

//DELETE produk
router.delete("/:id", deleteProduct);

module.exports = router;
