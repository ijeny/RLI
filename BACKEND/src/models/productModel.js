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
      p.id_kategori,
      p.nama_produk,
      p.deskripsi,
      p.stok_tersedia,
      p.harga_satuan,
      p.gambar_url,
      k.nama_kategori
    FROM produk p
    JOIN kategori_produk k
      ON p.id_kategori = k.id_kategori
    WHERE p.id_produk = ?
    `,
    [id],
    callback
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
            gambar_url
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.id_kategori,
            data.nama_produk,
            data.deskripsi,
            data.stok_tersedia,
            data.harga_satuan,
            data.gambar_url
        ],
        callback
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
            data.gambar_url,
            id
        ],
        callback
    );

};

//hapus produk
const deleteProduct = (id, callback) => {

    db.query(
        "delete from produk where id_produk = ?",
        [id],
        callback
    );
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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getDashboardProducts
};