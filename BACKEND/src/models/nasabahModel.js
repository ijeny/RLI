const db = require("../config/db");

// ambil semua data nasabah
const getAllNasabah = (callback) => {
    const sql = `
        SELECT
            u.id_user,
            u.nama_lengkap,
            u.email,
            u.telepon,
            u.alamat,
            r.id_rekening,
            r.saldo,
            r.total_sampah_kg
        FROM users u
        LEFT JOIN rekening_tabungan_sampah r
            ON u.id_user = r.id_user
        WHERE u.role = 'masyarakat'
        ORDER BY u.nama_lengkap ASC
    `;

    db.query(sql, callback);
};

//dashboard data nasabah
const getDashboardNasabah = (callback) => {
    const sql = `
        select
            (select count(*)
            from users
            where role = 'masyarakat') as total_nasabah,
            
            (select count(*)
            from users
            where role = 'masyarakat'
            and month(created_at) = month(current_date())
            )as nasabah_baru,

            (select ifnull(sum(saldo),0)
            from rekening_tabungan_sampah
            ) as total_saldo
    `;

    db.query(sql, callback);
};

//ambil nasabah berdasarkan id
const getNasabahById = (id, callback) => {
    const sql = `
        SELECT
            u.id_user,
            u.nama_lengkap,
            u.email,
            u.telepon,
            u.alamat,
            r.id_rekening,
            r.saldo,
            r.total_sampah_kg
        FROM users u
        LEFT JOIN rekening_tabungan_sampah r
            ON u.id_user = r.id_user
        WHERE u.id_user = ?
    `;

    db.query(sql, [id], callback);
};

const bcrypt = require("bcrypt");

const createNasabah = async (data, callback) => {

    try {

        const passwordHash = await bcrypt.hash(data.password, 10);

        const sqlUser = `
            INSERT INTO users
            (
                nama_lengkap,
                email,
                telepon,
                password,
                alamat,
                role
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sqlUser,
            [
                data.nama_lengkap,
                data.email,
                data.telepon,
                passwordHash,
                data.alamat,
                "masyarakat"
            ],
            (err, result) => {

                if (err) return callback(err);

                const idUser = result.insertId;

                const sqlRekening = `
                    INSERT INTO rekening_tabungan_sampah
                    (
                        id_user,
                        saldo,
                        total_sampah_kg
                    )
                    VALUES (?,0,0)
                `;

                db.query(
                    sqlRekening,
                    [idUser],
                    callback
                );

            }
        );

    } catch(error){

        callback(error);

    }

};

const updateNasabah = (id, data, callback) => {

    const sql = `
        UPDATE users
        SET
            nama_lengkap = ?,
            email = ?,
            telepon = ?,
            alamat = ?
        WHERE id_user = ?
    `;

    db.query(
        sql,
        [
            data.nama_lengkap,
            data.email,
            data.telepon,
            data.alamat,
            id
        ],
        callback
    );

};

const deleteNasabah = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id_user = ?
    `;

    db.query(sql, [id], callback);

};

module.exports = {
    getAllNasabah,
    getDashboardNasabah,
    getNasabahById,
    createNasabah,
    updateNasabah,
    deleteNasabah
};