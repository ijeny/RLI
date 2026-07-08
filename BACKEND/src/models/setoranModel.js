const db = require("../config/db");

// Ambil semua setoran
const getAllSetoran = (callback) => {

    const sql = `
        SELECT
            s.id_setoran,
            u.nama_lengkap,
            k.nama_kategori,
            s.tanggal_setoran,
            s.waktu_setoran,
            s.berat_kg,
            s.macam_sampah,
            s.harga_per_kg,
            s.total_harga,
            s.status

        FROM setoran_sampah s

        JOIN users u
            ON s.id_user = u.id_user

        JOIN kategori_sampah k
            ON s.id_kategori_sampah = k.id_kategori_sampah

        ORDER BY s.id_setoran DESC
    `;

    db.query(sql, callback);

};

const createSetoran = (data, callback) => {

    // Ambil harga dari kategori sampah
    db.query(
        "SELECT harga_per_kg FROM kategori_sampah WHERE id_kategori_sampah = ?",
        [data.id_kategori_sampah],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Kategori sampah tidak ditemukan"));
            }

            const harga = result[0].harga_per_kg;

            const total = harga * data.berat_kg;

            const sql = `
                INSERT INTO setoran_sampah
                (
                    id_user,
                    id_kategori_sampah,
                    tanggal_setoran,
                    waktu_setoran,
                    berat_kg,
                    macam_sampah,
                    harga_per_kg,
                    total_harga
                )
                VALUES (?,?,?,?,?,?,?,?)
            `;

            db.query(
                sql,
                [
                    data.id_user,
                    data.id_kategori_sampah,
                    data.tanggal_setoran,
                    data.waktu_setoran,
                    data.berat_kg,
                    data.macam_sampah,
                    harga,
                    total
                ],
                callback
            );

        }
    );

};

const approveSetoran = (id, callback) => {

    // ambil data setoran
    db.query(
        "SELECT * FROM setoran_sampah WHERE id_setoran = ?",
        [id],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Setoran tidak ditemukan"));
            }

            const setoran = result[0];

            // approve hanya sekali
            if (setoran.status === "disetujui") {
                return callback(new Error("Setoran sudah disetujui"));
            }

            // update status setoran
            db.query(
                "UPDATE setoran_sampah SET status='disetujui' WHERE id_setoran=?",
                [id],
                (err) => {

                    if (err) return callback(err);

                    // tambah saldo rekening
                    db.query(
                        `
                        UPDATE rekening_tabungan_sampah
                        SET
                            saldo = saldo + ?,
                            total_sampah_kg = total_sampah_kg + ?
                        WHERE id_user = ?
                        `,
                        [
                            setoran.total_harga,
                            setoran.berat_kg,
                            setoran.id_user
                        ],
                        callback
                    );

                }
            );

        }
    );

};

const getPendingSetoran = (callback) => {

    const sql = `
        SELECT
            s.id_setoran,
            u.nama_lengkap,
            k.nama_kategori,
            s.tanggal_setoran,
            s.waktu_setoran,
            s.berat_kg,
            s.macam_sampah,
            s.harga_per_kg,
            s.total_harga,
            s.status

        FROM setoran_sampah s

        JOIN users u
            ON s.id_user = u.id_user

        JOIN kategori_sampah k
            ON s.id_kategori_sampah = k.id_kategori_sampah

        WHERE s.status = 'pending'

        ORDER BY s.id_setoran DESC
    `

    db.query(sql, callback);

};

const rejectSetoran = (id, callback) => {

    db.query(
        "select * from setoran_sampah where id_setoran = ?",
        [id],
        (err,result)=>{
            if(err) return callback(err);

            if(result.length === 0){
                return callback(new Error("Setoran tidak ditemukan"));
            }

            const setoran = result[0];

            if (setoran.status === "ditolak") {
                return callback(new Error("Setoran sudah ditolak"));
            }

            if (setoran.status === "disetujui") {
                return callback(new Error("Setoran sudah disetujui"));
            }

            db.query(
                "UPDATE setoran_sampah SET status = 'ditolak' WHERE id_setoran = ?",
                [id],
                callback
            )
        }
    )

};

module.exports = {
    getAllSetoran,
    createSetoran,
    approveSetoran,
    getPendingSetoran,
    rejectSetoran
};