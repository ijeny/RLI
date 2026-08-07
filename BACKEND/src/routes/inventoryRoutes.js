const express = require("express");
const router = express.Router();

const {
  getInventories,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  stockIn,
  stockOut,
  getMutationHistory,
} = require("../controllers/inventoryController");

// GET semua inventory
router.get("/", getInventories);

// Riwayat mutasi
router.get("/mutasi", getMutationHistory);

// Barang masuk
router.post("/masuk", stockIn);

// Barang keluar
router.post("/keluar", stockOut);

// POST inventory
router.post("/", createInventory);

// GET berdasarkan ID
router.get("/:id", getInventory);

// UPDATE
router.put("/:id", updateInventory);

// DELETE
router.delete("/:id", deleteInventory);

module.exports = router;