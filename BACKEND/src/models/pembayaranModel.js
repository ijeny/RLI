const db = require("../config/db");

// Ambil semua pembayaran
const getAllPayments = (callback) => {
  const sql = `
    SELECT
      p.id_pembayaran,
      p.id_transaksi,
      t.kode_transaksi,
      p.metode_pembayaran,
      p.jumlah_bayar,
      p.status_pembayaran,
      p.tanggal_bayar,
      p.bukti_pembayaran
    FROM pembayaran_transaksi p
    JOIN transaksi_penjualan t
      ON p.id_transaksi = t.id_transaksi
    ORDER BY p.created_at DESC
  `;

  db.query(sql, callback);
};

// Ambil pembayaran berdasarkan ID transaksi
const getPaymentByTransaction = (id_transaksi, callback) => {
  const sql = `
    SELECT *
    FROM pembayaran_transaksi
    WHERE id_transaksi = ?
  `;

  db.query(sql, [id_transaksi], callback);
};

// Tambah pembayaran
const createPayment = (data, callback) => {
  const sql = `
    INSERT INTO pembayaran_transaksi
    (
      id_transaksi,
      metode_pembayaran,
      jumlah_bayar,
      status_pembayaran,
      tanggal_bayar,
      bukti_pembayaran
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.id_transaksi,
      data.metode_pembayaran,
      data.jumlah_bayar,
      data.status_pembayaran,
      data.tanggal_bayar,
      data.bukti_pembayaran,
    ],
    callback,
  );
};

// Update status pembayaran
const updatePayment = (id, data, callback) => {
  const sql = `
    UPDATE pembayaran_transaksi
    SET
      status_pembayaran = ?,
      bukti_pembayaran = ?
    WHERE id_pembayaran = ?
  `;

  db.query(sql, [data.status_pembayaran, data.bukti_pembayaran, id], callback);
};

module.exports = {
  getAllPayments,
  getPaymentByTransaction,
  createPayment,
  updatePayment,
};
