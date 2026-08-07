const express = require("express");
const router = express.Router();

const {
  getDetailTransaction,
  createDetail,
  deleteDetail,
} = require("../controllers/detailTransaksiController");

// GET detail transaksi
router.get("/:id", getDetailTransaction);

// POST detail transaksi
router.post("/", createDetail);

// DELETE detail transaksi
router.delete("/:id", deleteDetail);

module.exports = router;
