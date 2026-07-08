const Category = require("../models/categoryProductModel");

// Semua kategori
const getCategories = (req, res) => {

    Category.getAllCategories((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Detail kategori
const getCategory = (req, res) => {

    console.log("Get Category by ID dipanggil");

    Category.getCategoryById(req.params.id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        res.json(result[0]);

    });

};

// Tambah kategori
const createCategory = (req, res) => {

    Category.createCategory(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Kategori berhasil ditambahkan"
        });

    });

};

// Update kategori
const updateCategory = (req, res) => {

    Category.updateCategory(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Kategori tidak ditemukan"
                });
            }

            res.json({
                success: true,
                message: "Kategori berhasil diperbarui"
            });

        }
    );

};

// Hapus kategori
const deleteCategory = (req, res) => {

    Category.deleteCategory(req.params.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Kategori berhasil dihapus"
        });

    });

};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};