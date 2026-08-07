const express = require("express");
const router = express.Router();

const {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
} = require("../controllers/pembayaranController");

// GET semua pembayaran
router.get("/", getPayments);

// GET pembayaran berdasarkan transaksi
router.get("/:id", getPayment);

// POST pembayaran
router.post("/", createPayment);

// UPDATE pembayaran
router.put("/:id", updatePayment);

module.exports = router;
