const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardProducts
} = require("../controllers/productController");

router.get("/dashboard", getDashboardProducts);

// GET semua produk
router.get("/", getProducts);

// POST semua produk
router.post("/", createProduct)

// GET produk berdasarkan ID
router.get("/:id", getProduct);

//UPDATE produk
router.put("/:id", updateProduct);

//DELETE produk
router.delete("/:id", deleteProduct);

module.exports = router;