const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // mengambil token dari header authorization
  const authHeader = req.headers.authorization;

  // mengecek apakah token ada
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Format token salah",
    });
  }

  try {
    // Verifikasi token
    console.log("JWT_SECRET VERIFY =", process.env.JWT_SECRET);
    console.log("TOKEN =", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user ke request
    req.user = decoded;

    // Lanjut ke controller berikutnya
    next();
  }
catch (error) {
  console.log(error);

  return res.status(401).json({
    success: false,
    message: "Token tidak valid",
    error: error.message,
  });
  }
};

module.exports = verifyToken;