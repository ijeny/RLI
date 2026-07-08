const db = require("../config/db");

// Ambil semua kategori
const getAllCategories = (callback) => {

    const sql = `
        SELECT *
        FROM kategori_produk
        ORDER BY nama_kategori ASC
    `;

    db.query(sql, callback);

};

// Ambil kategori berdasarkan ID
const getCategoryById = (id, callback) => {

    db.query(
        "SELECT * FROM kategori_produk WHERE id_kategori = ?",
        [id],
        callback
    );

};

// Tambah kategori
const createCategory = (data, callback) => {

    db.query(
        `
        INSERT INTO kategori_produk
        (
            nama_kategori
        )
        VALUES (?)
        `,
        [
            data.nama_kategori
        ],
        callback
    );

};

// Update kategori
const updateCategory = (id, data, callback) => {

    db.query(
        `
        UPDATE kategori_produk
        SET nama_kategori = ?
        WHERE id_kategori = ?
        `,
        [
            data.nama_kategori,
            id
        ],
        callback
    );

};

// Hapus kategori
const deleteCategory = (id, callback) => {

    db.query(
        "DELETE FROM kategori_produk WHERE id_kategori = ?",
        [id],
        callback
    );

};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};