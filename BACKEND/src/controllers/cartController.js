const Cart = require("../models/cartModel");

const getCart = (req, res) => {

    Cart.getCartByUser(req.params.idUser, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const addCart = (req, res) => {

    Cart.addToCart(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Produk berhasil ditambahkan ke cart"
        });

    });

};

const updateCart = (req, res) => {

    Cart.updateCart(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Qty cart berhasil diupdate"
        });

    });

};

const deleteCart = (req, res) => {

    Cart.deleteCartItem(req.params.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Item cart tidak ditemukan"
            });
        }

        res.json({
            success: true,
            message: "Produk berhasil dihapus dari cart"
        });

    });

};

module.exports = {
    getCart,
    addCart,
    updateCart,
    deleteCart
};