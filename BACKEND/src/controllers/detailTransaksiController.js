const Detail = require("../models/detailTransaksiModel");

// GET detail transaksi
const getDetailTransaction = (req, res) => {
  Detail.getDetailByTransaction(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// POST detail transaksi
const createDetail = (req, res) => {
  Detail.createDetail(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      success: true,
      message: "Detail transaksi berhasil ditambahkan",
      id_detail: result.insertId,
    });
  });
};

// DELETE detail
const deleteDetail = (req, res) => {
  Detail.deleteDetail(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Detail transaksi tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Detail transaksi berhasil dihapus",
    });
  });
};

module.exports = {
  getDetailTransaction,
  createDetail,
  deleteDetail,
};
