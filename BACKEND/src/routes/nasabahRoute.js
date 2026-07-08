const express = require("express");
const router = express.Router();

const {
    getNasabah,
    getDashboard,
    getNasabahById,
    createNasabah,
    updateNasabah,
    deleteNasabah
} = require("../controllers/nasabahController");

router.get("/", getNasabah);

router.get("/dashboard", getDashboard);

router.get("/:id", getNasabahById);

router.post("/", createNasabah);

router.put("/:id", updateNasabah);

router.delete("/:id", deleteNasabah);

module.exports = router;