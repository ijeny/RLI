const Inventory = require("../models/inventoryModel");

// GET semua inventory
const getInventories = (req, res) => {
  Inventory.getAllInventory((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// GET inventory berdasarkan ID
const getInventory = (req, res) => {
  Inventory.getInventoryById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inventory tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

// POST inventory
const createInventory = (req, res) => {
  Inventory.createInventory(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      success: true,
      message: "Inventory berhasil ditambahkan",
      id_inventory: result.insertId,
    });
  });
};

// UPDATE inventory
const updateInventory = (req, res) => {
  Inventory.updateInventory(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inventory tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Inventory berhasil diupdate",
    });
  });
};

// DELETE inventory
const deleteInventory = (req, res) => {
  Inventory.deleteInventory(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inventory tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Inventory berhasil dihapus",
    });
  });
};

// Barang Masuk
const stockIn = (req, res) => {

  console.log("post sudah terpanggil");
  console.log(req.body);

  Inventory.stockIn(req.body, (err,result) => {

    console.log("error: ", err);
    console.log("result: ", result);

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Stok berhasil ditambahkan"
    });

  });

};

// Barang Keluar
const stockOut = (req, res) => {

  Inventory.stockOut(req.body, (err) => {

    if (err) {

      if (err.message === "Stok tidak mencukupi") {
        return res.status(400).json(err);
      }

      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Stok berhasil dikurangi"
    });

  });

};

// Riwayat Mutasi
const getMutationHistory = (req, res) => {

  Inventory.getMutationHistory((err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// console.log("stockIn =", typeof stockIn);
// console.log("stockOut =", typeof stockOut);
// console.log("getMutationHistory =", typeof getMutationHistory);

module.exports = {
  getInventories,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  stockIn,
  stockOut,
  getMutationHistory
};