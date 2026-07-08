const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const {
      nama_lengkap,
      email,
      telepon,
      password,
      alamat,
    } = req.body;

    const role = "masyarakat";

    // cek email
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email sudah digunakan",
          });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const sql = `
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
          sql,
          [
            nama_lengkap,
            email,
            telepon,
            hashPassword,
            alamat,
            role,
          ],
          (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
              success: true,
              message: "Register berhasil",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Email tidak ditemukan",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Password salah",
        });
      }

      console.log("JWT_SECRET LOGIN =", process.env.JWT_SECRET);

      const token = jwt.sign(
        {
          id: user.id_user,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      console.log("TOKEN:");
      console.log(token);

      res.json({
        success: true,
        message: "Login berhasil",
        token,
        user: {
          id: user.id_user,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};

// PROFILE
const getProfile = (req, res) => {

     console.log("GET PROFILE DIPANGGIL");

  db.query(
    `SELECT
      id_user,
      nama_lengkap,
      email,
      telepon,
      alamat,
      role,
      created_at
    FROM users
    WHERE id_user = ?`,
    [req.user.id],

    (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      res.json({
        success: true,
        user: result[0],
      });

    }
  );

};

module.exports = {
  register,
  login,
  getProfile,
};