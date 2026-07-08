const Product = require("../models/productModel");

// GET semua produk
const getProducts = (req, res) => {
  Product.getAllProducts((err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// GET produk berdasarkan id
const getProduct = (req, res) => {
  Product.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json(result[0]);
  });
};

//POST produk
const createProduct = (req, res) => {

    Product.createProduct(req.body, (err, result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.status(201).json({
            success: true,
            message: "Produk berhasil ditambahkan",
            id_produk:result.insertId
        });
    });
};

//UPDATE produk
const updateProduct = (req, res) => {

  Product.updateProduct(req.params.id, req.body, (err, result)=>{
    if(err){
      return res.status(500).json(err);
    }

    if(result.affectedRows === 0){
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil diupdate",
    });
  });  

};

//DELETE produk
const deleteProduct = (req, res) => {

  Product.deleteProduct(req.params.id, (err, result)=>{
    if(err){
      return res.status(500).json(err);
    }

    if(result.affectedRows === 0){
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  });

};

const getDashboardProducts = (req, res) => {
  Product.getDashboardProducts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardProducts
};