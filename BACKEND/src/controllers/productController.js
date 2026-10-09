const Product = require("../models/productModel");

// GET semua produk
const getProducts = (req, res) => {
  Product.getAllProducts((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// GET produk berdasarkan id
const getProduct = (req, res) => {
  Product.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

//POST produk
const createProduct = (req, res) => {
  console.log("DATA PRODUK:", req.body);
  console.log("FILE PRODUK:", req.file);

  const data = {
    id_kategori: Number(req.body.id_kategori),
    nama_produk: req.body.nama_produk,
    deskripsi: req.body.deskripsi,
    stok_tersedia: Number(req.body.stok_tersedia || 0),
    harga_satuan: Number(req.body.harga_satuan || 0),
    satuan:
      String(req.body.satuan || "pcs")
        .trim()
        .toLowerCase() || "pcs",
    gambar_url: req.file ? req.file.filename : null,
  };

  Product.createProduct(data, (err, result) => {
    if (err) {
      console.error("ERROR INSERT PRODUK:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan produk",
        error: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage,
      });
    }

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      id_produk: result.insertId,
    });
  });
};

//UPDATE produk
const updateProduct = (req, res) => {
  console.log("DATA UPDATE:", req.body);
  console.log("FILE UPDATE:", req.file);

  const data = {
    id_kategori: Number(req.body.id_kategori),
    nama_produk: req.body.nama_produk,
    deskripsi: req.body.deskripsi,
    stok_tersedia: Number(req.body.stok_tersedia || 0),
    harga_satuan: Number(req.body.harga_satuan || 0),
    satuan:
      String(req.body.satuan || "pcs")
        .trim()
        .toLowerCase() || "pcs",
  };

  // Kalau upload foto baru, gunakan foto baru.
  // Kalau tidak, pertahankan foto lama.
  if (req.file) {
    data.gambar_url = req.file.filename;
  } else {
    data.gambar_url = req.body.gambar_url || null;
  }

  Product.updateProduct(req.params.id, data, (err, result) => {
    if (err) {
      console.error("ERROR UPDATE PRODUK:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengupdate produk",
        error: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil diupdate",
    });
  });
};

//DELETE produk
const deleteProduct = (req, res) => {
  Product.deleteProduct(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  });
};

const getDashboardProducts = (req, res) => {
  Product.getDashboardProducts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

const getMonthlySalesSummary = (req, res) => {
  Product.getMonthlySalesSummary((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil ringkasan penjualan bulanan",
        error: err.message,
      });
    }

    res.json(
      result.map((item) => ({
        nama_produk: item.nama_produk,
        satuan: item.satuan || "unit",
        total_kuantitas: Number(item.total_kuantitas || 0),
        total_penjualan: Number(item.total_penjualan || 0),
      })),
    );
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardProducts,
  getMonthlySalesSummary,
};
