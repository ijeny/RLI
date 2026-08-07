const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const nasabahRoutes = require("./routes/nasabahRoute");
const setoranRoutes = require("./routes/setoranRoute");
const penarikanRoutes = require("./routes/penarikanRoute");
const categoryProductRoutes = require("./routes/categoryProductRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
const detailTransaksiRoutes = require("./routes/detailTransaksiRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");

const app = express();
// console.log("Category Product Route Loaded");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/nasabah", nasabahRoutes);
app.use("/api/setoran", setoranRoutes);
app.use("/api/penarikan", penarikanRoutes);
app.use("/api/product-categories", categoryProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/detail-transaksi", detailTransaksiRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

// console.log("category-product route registered");
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API TEST BERHASIL"
    });
});

app.get("/api/test-transaksi", (req, res) => {
  res.json({ message: "Transaksi OK" });
});

// Test Route
app.get("/", (req, res) => { 
    res.send("Backend Rumah Literasi Indonesia berjalan");
});

module.exports = app;