const Penarikan = require("../models/penarikanModel");

const getPenarikan = (req, res) => {

    Penarikan.getAllPenarikan((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const createPenarikan = (req, res) => {
    
    Penarikan.createPenarikan(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Penarikan berhasil ditambahkan"
        });

    });

};

const approvePenarikan = (req, res) => {
    
    Penarikan.approvePenarikan(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Penarikan berhasil disetujui"
        });
    });

};

const getPendingPenarikan = (req, res) => {
    Penarikan.getPendingPenarikan((err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

const rejectPenarikan = (req, res) => {
    Penarikan.rejectPenarikan(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Penarikan berhasil ditolak"
        });
    });
};

const getPenarikanById = (req, res) => {
    Penarikan.getPenarikanById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0){
            return res.status(404).json({
                success: false,
                message: "Penarikan tidak ditemukan"
            });
        }
        res.json(result);
    });
};

const deletePenarikan = (req, res) => {
    Penarikan.deletePenarikan(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Penarikan berhasil dihapus"
        });
    });
};

module.exports = {
    getPenarikan,
    createPenarikan,
    getPendingPenarikan, 
    approvePenarikan,
    rejectPenarikan,
    getPenarikanById,
    deletePenarikan
};