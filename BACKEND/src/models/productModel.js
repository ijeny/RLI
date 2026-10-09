const db = require("../config/db");

// mengambil semua produk
const getAllProducts = (callback) => {
  const sql = `
    SELECT
      p.id_produk,
      p.nama_produk,
      p.deskripsi,
      p.stok_tersedia,
      p.harga_satuan,
      p.satuan,
      p.gambar_url,
      k.nama_kategori
    FROM produk p
    JOIN kategori_produk k
      ON p.id_kategori = k.id_kategori
    ORDER BY p.id_produk ASC
  `;

  db.query(sql, callback);
};

// mengambil produk berdasarkan ID
const getProductById = (id, callback) => {
  db.query(
    `
    SELECT
        p.id_produk,
        p.nama_produk,
        p.deskripsi,
        p.stok_tersedia,
        p.harga_satuan,
        p.satuan,
        p.gambar_url,
        k.nama_kategori
    FROM produk p
    JOIN kategori_produk k
        ON p.id_kategori = k.id_kategori
    ORDER BY p.id_produk ASC
 `,
    [id],
    callback,
  );
};

// menambahkan produk
const createProduct = (data, callback) => {
  const sql = `
    INSERT INTO produk
    (
      id_kategori,
      nama_produk,
      deskripsi,
      stok_tersedia,
      harga_satuan,
      satuan,
      gambar_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.id_kategori,
      data.nama_produk,
      data.deskripsi,
      data.stok_tersedia,
      data.harga_satuan,
      data.satuan,
      data.gambar_url,
    ],
    callback,
  );
};

//update produk
const updateProduct = (id, data, callback) => {
  const sql = `
        UPDATE produk
        SET
            id_kategori = ?,
            nama_produk = ?,
            deskripsi = ?,
            stok_tersedia = ?,
            harga_satuan = ?,
            satuan = ?,
            gambar_url = ?
        WHERE id_produk = ?
    `;

  db.query(
    sql,
    [
      data.id_kategori,
      data.nama_produk,
      data.deskripsi,
      data.stok_tersedia,
      data.harga_satuan,
      data.satuan,
      data.gambar_url,
      id,
    ],
    callback,
  );
};

//hapus produk
const deleteProduct = (id, callback) => {
  db.query("delete from produk where id_produk = ?", [id], callback);
};

//dashboard produk
const getDashboardProducts = (callback) => {
  const sql = `
        SELECT 
            COUNT(*) AS total_produk,
            COUNT(DISTINCT id_kategori) AS total_kategori,
            SUM(stok_tersedia) AS total_stok,
            
            SUM(
                CASE 
                    WHEN stok_tersedia <= 5 THEN 1
                    ELSE 0
                END
            ) AS produk_hampir_habis
        FROM produk
        `;

  db.query(sql, callback);
};

const getMonthlySalesSummary = (callback) => {
  const sql = `
    SELECT
      p.id_produk,
      p.nama_produk,
      p.satuan,
      COALESCE(SUM(dt.kuantitas), 0) AS total_kuantitas,
      COALESCE(SUM(dt.kuantitas * dt.harga_saat_beli), 0) AS total_penjualan
    FROM produk p
    LEFT JOIN detail_transaksi dt
      ON dt.id_produk = p.id_produk
    LEFT JOIN transaksi_penjualan t
      ON t.id_transaksi = dt.id_transaksi
     AND DATE_FORMAT(t.tanggal_transaksi, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
    GROUP BY p.id_produk, p.nama_produk, p.satuan
    ORDER BY total_penjualan DESC, total_kuantitas DESC, p.nama_produk ASC
    LIMIT 4
  `;

  db.query(sql, callback);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardProducts,
  getMonthlySalesSummary,
};
