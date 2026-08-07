const db = require("../config/db");

// Ambil semua inventory
const getAllInventory = (callback) => {
  const sql = `
    SELECT *
    FROM inventory_ifk
    ORDER BY id_inventory ASC
  `;

  db.query(sql, callback);
};

// Ambil inventory berdasarkan ID
const getInventoryById = (id, callback) => {
  const sql = `
    SELECT *
    FROM inventory_ifk
    WHERE id_inventory = ?
  `;

  db.query(sql, [id], callback);
};

// Tambah inventory
const createInventory = (data, callback) => {
  const sql = `
    INSERT INTO inventory_ifk
    (
      nama_item,
      kategori_divisi,
      stok_terkini,
      satuan
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [data.nama_item, data.kategori_divisi, data.stok_terkini, data.satuan],
    callback,
  );
};

// Update inventory
const updateInventory = (id, data, callback) => {
  const sql = `
    UPDATE inventory_ifk
    SET
      nama_item = ?,
      kategori_divisi = ?,
      stok_terkini = ?,
      satuan = ?
    WHERE id_inventory = ?
  `;

  db.query(
    sql,
    [data.nama_item, data.kategori_divisi, data.stok_terkini, data.satuan, id],
    callback,
  );
};

// Hapus inventory
const deleteInventory = (id, callback) => {
  db.query("DELETE FROM inventory_ifk WHERE id_inventory = ?", [id], callback);
};

// Barang Masuk
const stockIn = (data, callback) => {
  const insertLog = `
    INSERT INTO log_mutasi_inventory
    (
      id_inventory,
      tipe_mutasi,
      jumlah,
      keterangan
    )
    VALUES (?, 'Masuk', ?, ?)
  `;

  db.query(
    insertLog,
    [
      data.id_inventory,
      data.jumlah,
      data.keterangan,
    ],
    (err) => {
      if (err) return callback(err);

      const updateStock = `
        UPDATE inventory_ifk
        SET stok_terkini = stok_terkini + ?
        WHERE id_inventory = ?
      `;

      db.query(
        updateStock,
        [
          data.jumlah,
          data.id_inventory,
        ],
        callback
      );
    }
  );
};

// Barang Keluar
const stockOut = (data, callback) => {

  const updateStock = `
    UPDATE inventory_ifk
    SET stok_terkini = stok_terkini - ?
    WHERE id_inventory = ?
      AND stok_terkini >= ?
  `;

  db.query(
    updateStock,
    [
      data.jumlah,
      data.id_inventory,
      data.jumlah,
    ],
    (err, result) => {

      if (err) return callback(err);

      if (result.affectedRows === 0) {
        return callback({
          message: "Stok tidak mencukupi"
        });
      }

      const insertLog = `
        INSERT INTO log_mutasi_inventory
        (
          id_inventory,
          tipe_mutasi,
          jumlah,
          keterangan
        )
        VALUES (?, 'Keluar', ?, ?)
      `;

      db.query(
        insertLog,
        [
          data.id_inventory,
          data.jumlah,
          data.keterangan,
        ],
        callback
      );

    }
  );

};

// Riwayat Mutasi
const getMutationHistory = (callback) => {

  const sql = `
    SELECT
      l.id_mutasi,
      i.nama_item,
      l.tipe_mutasi,
      l.jumlah,
      l.tanggal,
      l.keterangan
    FROM log_mutasi_inventory l
    JOIN inventory_ifk i
      ON l.id_inventory = i.id_inventory
    ORDER BY l.tanggal DESC
  `;

  db.query(sql, callback);

};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  stockIn,
  stockOut,
  getMutationHistory
};