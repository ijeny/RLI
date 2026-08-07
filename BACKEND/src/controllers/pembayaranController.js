const Payment = require("../models/pembayaranModel");

// GET semua pembayaran
const getPayments = (req, res) => {
  Payment.getAllPayments((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// GET pembayaran berdasarkan transaksi
const getPayment = (req, res) => {
  Payment.getPaymentByTransaction(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Pembayaran tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

// POST pembayaran
const createPayment = (req, res) => {
  Payment.createPayment(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      success: true,
      message: "Pembayaran berhasil ditambahkan",
      id_pembayaran: result.insertId,
    });
  });
};

// UPDATE pembayaran
const updatePayment = (req, res) => {
  Payment.updatePayment(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Pembayaran tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Pembayaran berhasil diperbarui",
    });
  });
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
};
