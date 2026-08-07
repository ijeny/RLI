const Transaksi = require("../models/transaksiModel");

// GET semua transaksi
const getTransactions = (req, res) => {
  Transaksi.getAllTransactions((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// GET transaksi berdasarkan ID
const getTransaction = (req, res) => {
  Transaksi.getTransactionById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

// POST transaksi
const createTransaction = (req, res) => {
  Transaksi.createTransaction(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil ditambahkan",
      id_transaksi: result.insertId,
    });
  });
};

// UPDATE status transaksi
const updateTransactionStatus = (req, res) => {
  Transaksi.updateTransactionStatus(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Status transaksi berhasil diubah",
    });
  });
};

// DELETE transaksi
const deleteTransaction = (req, res) => {
  Transaksi.deleteTransaction(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Transaksi berhasil dihapus",
    });
  });
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
};
