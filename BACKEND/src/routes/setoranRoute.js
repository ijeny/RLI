const express = require("express");
const router = express.Router();

const {
    getSetoran,
    createSetoran,
    approveSetoran,
    getPendingSetoran,
    rejectSetoran
} = require("../controllers/setoranController");

router.get("/", getSetoran);

router.post("/", createSetoran);

router.put("/:id/approve", approveSetoran);

router.get("/pending", getPendingSetoran);

router.put("/:id/reject", rejectSetoran);

module.exports = router;