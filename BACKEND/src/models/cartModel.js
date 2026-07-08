const db = require("../config/db");

// Ambil cart berdasarkan user
const getCartByUser = (idUser, callback) => {

    const sql = `
        SELECT
            ci.id_cart_item,
            p.id_produk,
            p.nama_produk,
            p.harga_satuan,
            p.gambar_url,
            ci.qty,
            ci.subtotal

        FROM cart c

        JOIN cart_items ci
            ON c.id_cart = ci.id_cart

        JOIN produk p
            ON ci.id_produk = p.id_produk

        WHERE c.id_user = ?
    `;

    db.query(sql, [idUser], callback);

};

// Tambah produk ke cart
const addToCart = (data, callback) => {

    // Cari cart milik user
    db.query(
        "SELECT * FROM cart WHERE id_user = ?",
        [data.id_user],
        (err, cartResult) => {

            if (err) return callback(err);

            // Kalau user belum punya cart
            if (cartResult.length === 0) {

                db.query(
                    "INSERT INTO cart (id_user) VALUES (?)",
                    [data.id_user],
                    (err, result) => {

                        if (err) return callback(err);

                        insertCartItem(result.insertId);

                    }
                );

            } else {

                insertCartItem(cartResult[0].id_cart);

            }

        }
    );

    function insertCartItem(id_cart) {

        // Cek apakah produk sudah ada di cart
        db.query(
            `
            SELECT *
            FROM cart_items
            WHERE id_cart = ?
            AND id_produk = ?
            `,
            [
                id_cart,
                data.id_produk
            ],
            (err, item) => {

                if (err) return callback(err);

                if (item.length > 0) {

                    // Tambah qty
                    const qtyBaru = item[0].qty + data.qty;

                    const subtotalBaru =
                        qtyBaru * parseFloat(data.harga);

                    db.query(
                        `
                        UPDATE cart_items
                        SET qty = ?, subtotal = ?
                        WHERE id_cart_item = ?
                        `,
                        [
                            qtyBaru,
                            subtotalBaru,
                            item[0].id_cart_item
                        ],
                        callback
                    );

                } else {

                    db.query(
                        `
                        INSERT INTO cart_items
                        (
                            id_cart,
                            id_produk,
                            qty,
                            harga,
                            subtotal
                        )
                        VALUES (?,?,?,?,?)
                        `,
                        [
                            id_cart,
                            data.id_produk,
                            data.qty,
                            data.harga,
                            data.qty * data.harga
                        ],
                        callback
                    );

                }

            }
        );

    }

};

// Update qty cart
const updateCart = (data, callback) => {

    db.query(
        `
        SELECT
            ci.*,
            p.harga_satuan
        FROM cart_items ci

        JOIN produk p
            ON ci.id_produk = p.id_produk

        WHERE ci.id_cart_item = ?
        `,
        [data.id_cart_item],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Item cart tidak ditemukan"));
            }

            const harga = parseFloat(result[0].harga_satuan);

            const subtotal = harga * data.qty;

            db.query(
                `
                UPDATE cart_items
                SET qty = ?, subtotal = ?
                WHERE id_cart_item = ?
                `,
                [
                    data.qty,
                    subtotal,
                    data.id_cart_item
                ],
                callback
            );

        }
    );

};

//Hapus item cart
const deleteCartItem = (id_cart_item, callback) => {
    db.query(
        `
        DELETE FROM cart_items
        WHERE id_cart_item = ?
        `,
        [id_cart_item],
        callback
    );
}

module.exports = {
    getCartByUser,
    addToCart,
    updateCart,
    deleteCartItem
};