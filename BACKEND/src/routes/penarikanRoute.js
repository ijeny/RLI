const express = require("express");
const router = express.Router();

const {
    getPenarikan,
    createPenarikan,
    getPendingPenarikan,
    approvePenarikan,
    rejectPenarikan,
    getPenarikanById
} = require("../controllers/penarikanController");

router.get("/", getPenarikan);

router.post("/", createPenarikan);

router.get("/pending", getPendingPenarikan);

router.put("/approve/:id", approvePenarikan);

router.put("/reject/:id", rejectPenarikan);

router.get("/:id", getPenarikanById);

module.exports = router;