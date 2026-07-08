const db = require("../config/db");

const checkout = (data, callback) => {

    // Ambil isi cart user
    const sql = `
        SELECT
            c.id_cart,
            ci.id_cart_item,
            ci.id_produk,
            ci.qty,
            ci.harga,
            ci.subtotal

        FROM cart c

        JOIN cart_items ci
            ON c.id_cart = ci.id_cart

        WHERE c.id_user = ?
    `;

    db.query(sql, [data.id_user], (err, cartItems) => {

        if (err) return callback(err);

        if (cartItems.length === 0) {
            return callback(new Error("Cart masih kosong"));
        }

        // menghitung total
        let totalHarga = 0;

        cartItems.forEach(item => {
            totalHarga += parseFloat(item.subtotal);
        });

        // memproses kode transaksi
        const sekarang = new Date();

        const tanggal =
            sekarang.getFullYear().toString() +
            String(sekarang.getMonth() + 1).padStart(2, "0") +
            String(sekarang.getDate()).padStart(2, "0");

        const kodeTransaksi =
            "TRX" +
            tanggal +
            String(Date.now()).slice(-5);

        // menyimpan transaksi
        db.query(
            `
            INSERT INTO transaksi_penjualan
            (
                kode_transaksi,
                id_pembeli,
                total_harga,
                metode_pembayaran,
                alamat_pengiriman
            )
            VALUES (?,?,?,?,?)
            `,
            [
                kodeTransaksi,
                data.id_user,
                totalHarga,
                data.metode_pembayaran,
                data.alamat_pengiriman
            ],
            (err, transaksiResult) => {

                if (err) return callback(err);

                const idTransaksi = transaksiResult.insertId;

                // menyimpan detail transaksi
                const detailValues = cartItems.map(item => [
                    idTransaksi,
                    item.id_produk,
                    item.qty,
                    item.harga
                ]);

                db.query(
                    `
                    INSERT INTO detail_transaksi
                    (
                        id_transaksi,
                        id_produk,
                        kuantitas,
                        harga_saat_beli
                    )
                    VALUES ?
                    `,
                    [detailValues],
                    (err) => {

                        if (err) return callback(err);

                        // menyimpan pembayaran
                        db.query(
                            `
                            INSERT INTO pembayaran_transaksi
                            (
                                id_transaksi,
                                metode_pembayaran,
                                jumlah_bayar,
                                status_pembayaran
                            )
                            VALUES (?,?,?,?)
                            `,
                            [
                                idTransaksi,
                                data.metode_pembayaran,
                                totalHarga,
                                "Menunggu"
                            ],
                            (err) => {

                                if (err) return callback(err);

                                // mengurangi stok
                                updateStock(0);

                            }
                        );

                    }
                );

                // function mengurangi stok
                function updateStock(index) {

                    if (index >= cartItems.length) {
                        return deleteCart();
                    }

                    const item = cartItems[index];

                    //mengambil stok saat ini
                    db.query(
                        "SELECT stok_tersedia FROM produk WHERE id_produk =?",
                        [item.id_produk],
                        (err, result) => {
                            if (err) return callback(err);

                            if (result.length === 0) {
                                return callback(new Error("produk tidak ditemukan"));
                            }

                            const stok = result[0].stok_tersedia;
                            if (stok < item.qty) {
                                return callback(
                                new Error(`Stok tidak mencukupi. stok tersedia: ${stok} `)
                                );
                            }

                            db.query(
                                `
                                UPDATE produk
                                SET stok_tersedia = stok_tersedia - ?
                                WHERE id_produk = ?
                                `,
                                [
                                    item.qty,
                                    item.id_produk
                                ],
                                (err) => {

                                    if (err) return callback(err);

                                    updateStock(index + 1);

                                }
                            );

                        }
                    )
                }

                // function menghapus cart
                function deleteCart() {

                    db.query(
                        `
                        DELETE ci
                        FROM cart_items ci
                        JOIN cart c
                            ON ci.id_cart = c.id_cart
                        WHERE c.id_user = ?
                        `,
                        [data.id_user],
                        (err) => {

                            if (err) return callback(err);

                            callback(null, {
                                id_transaksi: idTransaksi,
                                kode_transaksi: kodeTransaksi,
                                totalHarga
                            });

                        }
                    );

                }

            }

        );

    });

};

module.exports = {
    checkout
};