const db = require("../config/db");

// Ambil detail berdasarkan transaksi
const getDetailByTransaction = (id_transaksi, callback) => {
  const sql = `
    SELECT
      d.id_detail,
      d.id_transaksi,
      d.id_produk,
      p.nama_produk,
      d.kuantitas,
      d.harga_saat_beli
    FROM detail_transaksi d
    JOIN produk p
      ON d.id_produk = p.id_produk
    WHERE d.id_transaksi = ?
    ORDER BY d.id_detail ASC
  `;

  db.query(sql, [id_transaksi], callback);
};

// Tambah detail transaksi
const createDetail = (data, callback) => {
  const sql = `
    INSERT INTO detail_transaksi
    (
      id_transaksi,
      id_produk,
      kuantitas,
      harga_saat_beli
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [data.id_transaksi, data.id_produk, data.kuantitas, data.harga_saat_beli],
    callback,
  );
};

// Hapus detail
const deleteDetail = (id_detail, callback) => {
  db.query(
    "DELETE FROM detail_transaksi WHERE id_detail = ?",
    [id_detail],
    callback,
  );
};

module.exports = {
  getDetailByTransaction,
  createDetail,
  deleteDetail,
};
