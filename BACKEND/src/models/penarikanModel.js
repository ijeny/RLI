const db = require("../config/db");

// Ambil semua data penarikan
const getAllPenarikan = (callback) => {

    const sql = `
        SELECT
            p.id_penarikan,
            u.nama_lengkap,
            p.jumlah,
            p.metode,
            p.nama_bank,
            p.no_rekening,
            p.nama_pemilik_rekening,
            p.status_penarikan,
            p.tanggal_pengajuan

        FROM penarikan_saldo p

        JOIN users u
            ON p.id_user = u.id_user

        ORDER BY p.id_penarikan DESC
    `;

    db.query(sql, callback);

};
 
// mengajukan penarikan saldo
const createPenarikan = (data, callback) => {
    
    db.query(
        `
        INSERT INTO penarikan_saldo
        (
            id_user,
            jumlah,
            metode,
            nama_bank,
            no_rekening,
            nama_pemilik_rekening,
            status_penarikan
        )
        VALUES (?,?,?,?,?,?,?)
        `,
        [
            data.id_user,
            data.jumlah,
            data.metode,
            data.nama_bank,
            data.no_rekening,
            data.nama_pemilik_rekening,
            "pending"
        ],
        callback
    );

};

// Reject penarikan
const rejectPenarikan = (id, callback) => {

    db.query(
        "SELECT * FROM penarikan_saldo WHERE id_penarikan = ?",
        [id],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Penarikan tidak ditemukan"));
            }

            const penarikan = result[0];

            if (penarikan.status_penarikan === "approved") {
                return callback(new Error("Penarikan sudah disetujui"));
            }

            if (penarikan.status_penarikan === "rejected") {
                return callback(new Error("Penarikan sudah ditolak"));
            }

            // Update status penarikan
            db.query(
                "UPDATE penarikan_saldo SET status_penarikan = 'rejected' WHERE id_penarikan = ?",
                [id],
                callback
            );
        }
    );

};

// Approve penarikan
const approvePenarikan = (id, callback) => {

    db.query(
        "SELECT * FROM penarikan_saldo WHERE id_penarikan = ?",
        [id],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Data penarikan tidak ditemukan"));
            }

            const penarikan = result[0];

            if (penarikan.status_penarikan === "pending") {
                return callback(new Error("Penarikan sudah diproses"));
            }

            // update status penarikan
            db.query(
                "select * from rekening_tabungan_sampah where id_user = ?",
                [penarikan.id_user],
                (err, rekening) => {

                    if (err) return callback(err);

                    if (rekening.length === 0){
                        return callback(new Error("rekening tidak ditemukan"));
                    }

                    if (parseFloat(rekening[0].saldo) < parseFloat(penarikan.jumlah)){
                        return callback(new Error("Saldo tidak mencukupi"));
                    }

                    const saldoBaru = parseFloat(rekening[0].saldo) -
                                     parseFloat(penarikan.jumlah);

                    db.query(
                        "update rekening_tabungan_sampah set saldo=? where id_user=?",
                        [saldoBaru, penarikan.id_user],
                        (err) => {
                            if (err) return callback(err);

                            // update status penarikan
                            db.query(
                                "update penarikan_saldo set status_penarikan=? where id_penarikan=?",
                                ["approved", id],
                                callback
                            );
                        }
                    );


                }
            )
        }
    );

};


// Ambil pending penarikan
const getPendingPenarikan = (callback) => {
    const sql = `
        SELECT
            p.id_penarikan,
            u.nama_lengkap,
            p.jumlah,
            p.metode,
            p.nama_bank,
            p.no_rekening,
            p.nama_pemilik_rekening,
            p.status_penarikan,
            p.tanggal_pengajuan

        FROM penarikan_saldo p

        JOIN users u
            ON p.id_user = u.id_user

        WHERE p.status_penarikan = 'pending'

        ORDER BY p.id_penarikan DESC
    `;

    db.query(sql, callback);
};

//penarikan berdasarkan id user
const getPenarikanById = (id, callback) => {
    const sql = `
        SELECT 
            p.id_penarikan,
            p.id_user,
            u.nama_lengkap,
            p.jumlah,
            p.metode,
            p.nama_bank,
            p.no_rekening,
            p.nama_pemilik_rekening,
            p.status_penarikan,
            p.catatan,
            p.tanggal_pengajuan,
            p.tanggal_proses

        FROM penarikan_saldo p

        JOIN users u
            ON p.id_user = u.id_user

        WHERE p.id_user = ?

        ORDER BY p.id_penarikan DESC
    `;

    db.query(sql, [id], callback);
};

//hapus penarikan
const deletePenarikan = (id, callback) => {
    db.query(
        "SELECT status_penarikan FROM penarikan_saldo WHERE id_penarikan = ?",
        [id],
        (err, result) => {

            if (err) return callback(err);

            if (result.length === 0) {
                return callback(new Error("Penarikan tidak ditemukan"));
            }

            const status = result[0].status_penarikan;

            if (status === "approved" || status === "paid") {
                return callback(
                    new Error("Penarikan tidak bisa dihapus"));
            }

            db.query(
                "DELETE FROM penarikan_saldo WHERE id_penarikan = ?",
                [id],
                callback
            );
        }
    );
};

module.exports = {
    getAllPenarikan,
    createPenarikan,
    approvePenarikan,
    rejectPenarikan,
    getPendingPenarikan,
    getPenarikanById,
    deletePenarikan
};