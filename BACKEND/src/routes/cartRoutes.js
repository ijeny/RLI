const express = require("express");

const router = express.Router();

const {
    getCart,
    addCart,
    updateCart,
    deleteCart
} = require("../controllers/cartController");

router.get("/:idUser", getCart);

router.post("/", addCart);

router.put("/update", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;
