const db = require("../config/db");

// GET semua user
const getUsers = (req, res) => {
  db.query(
    `
    SELECT
      id_user,
      nama_lengkap AS name,
      email,
      role,
      'Aktif' AS status
    FROM users
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// POST tambah user
const createUser = (req, res) => {
  const { nama_lengkap, email, telepon, password, alamat, role } = req.body;

  const sql = `
    INSERT INTO users
    (nama_lengkap, email, telepon, password, alamat, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nama_lengkap, email, telepon, password, alamat, role],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        id: result.insertId,
        message: "User berhasil ditambahkan",
      });
    }
  );
};

// PUT update user
const updateUser = (req, res) => {
  db.query(
    `
    UPDATE users
    SET nama_lengkap = ?, email = ?, telepon = ?, password = ?, alamat = ?, role = ?
    WHERE id_user = ?
    `,
    [
      req.body.nama_lengkap,
      req.body.email,
      req.body.telepon,
      req.body.password,
      req.body.alamat,
      req.body.role,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      res.json({
        success: true,
        message: "User berhasil diupdate",
      });
    }
  );
};

// DELETE user
const deleteUser = (req, res) => {
  db.query(
    "DELETE FROM users WHERE id_user = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      res.json({
        success: true,
        message: "User berhasil dihapus",
      });
    }
  );
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};