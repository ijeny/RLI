const db = require("../config/db");

// Ambil semua transaksi
const getAllTransactions = (callback) => {
  const sql = `
    SELECT *
    FROM transaksi_penjualan
    ORDER BY tanggal_transaksi DESC
  `;

  db.query(sql, callback);
};

// Ambil transaksi berdasarkan ID
const getTransactionById = (id, callback) => {
  const sql = `
    SELECT *
    FROM transaksi_penjualan
    WHERE id_transaksi = ?
  `;

  db.query(sql, [id], callback);
};

// Tambah transaksi
const createTransaction = (data, callback) => {
  const sql = `
    INSERT INTO transaksi_penjualan
    (
      kode_transaksi,
      id_pembeli,
      total_harga,
      status_pembayaran,
      status_pesanan,
      metode_pembayaran,
      alamat_pengiriman
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.kode_transaksi,
      data.id_pembeli,
      data.total_harga,
      data.status_pembayaran,
      data.status_pesanan,
      data.metode_pembayaran,
      data.alamat_pengiriman,
    ],
    callback,
  );
};

// Update status transaksi
const updateTransactionStatus = (id, data, callback) => {
  const sql = `
    UPDATE transaksi_penjualan
    SET
      status_pembayaran = ?,
      status_pesanan = ?
    WHERE id_transaksi = ?
  `;

  db.query(sql, [data.status_pembayaran, data.status_pesanan, id], callback);
};

// Hapus transaksi
const deleteTransaction = (id, callback) => {
  db.query(
    "DELETE FROM transaksi_penjualan WHERE id_transaksi = ?",
    [id],
    callback,
  );
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
};
