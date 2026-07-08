const Checkout = require("../models/checkoutModel");

const checkout = (req, res) => {

    Checkout.checkout(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Checkout berhasil",
            id_transaksi: result.id_transaksi,
            kode_transaksi: result.kode_transaksi,
            total_harga: result.totalHarga
        });

    });

};

module.exports = {
    checkout
};