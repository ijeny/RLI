const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Transaksi Route Berhasil"
    });
});

const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
} = require("../controllers/transaksiController");

// GET semua transaksi
router.get("/", getTransactions);

// POST transaksi
router.post("/", createTransaction);

// GET transaksi berdasarkan ID
router.get("/:id", getTransaction);

// UPDATE status transaksi
router.put("/:id/status", updateTransactionStatus);

// DELETE transaksi
router.delete("/:id", deleteTransaction);

module.exports = router;
