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

// console.log("category-product route registered");
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API TEST BERHASIL"
    });
});

// Test Route
app.get("/", (req, res) => { 
    res.send("Backend Rumah Literasi Indonesia berjalan");
});

module.exports = app;