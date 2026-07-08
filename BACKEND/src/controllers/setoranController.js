const Setoran = require("../models/setoranModel");

const getSetoran = (req, res) => {

    Setoran.getAllSetoran((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const createSetoran = (req, res) => {

    Setoran.createSetoran(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Setoran berhasil ditambahkan"
        });

    });

};

const approveSetoran = (req, res) => {

    Setoran.approveSetoran(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            message:"Setoran berhasil disetujui"
        });

    });

};

const getPendingSetoran = (req, res) => {
    Setoran.getPendingSetoran((err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

const rejectSetoran = (req, res) => {
    Setoran.rejectSetoran(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            message:"Setoran berhasil ditolak"
        });
    });
};

module.exports = {
    getSetoran,
    createSetoran,
    approveSetoran,
    getPendingSetoran,
    rejectSetoran
};