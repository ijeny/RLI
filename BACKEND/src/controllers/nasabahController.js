const Nasabah = require("../models/nasabahModel");

const getNasabah = (req, res) => {

    Nasabah.getAllNasabah((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const getDashboard = (req, res) => {

    Nasabah.getDashboardNasabah((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

const getNasabahById = (req, res) => {

    Nasabah.getNasabahById(req.params.id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nasabah tidak ditemukan",
            });
        }

        res.json(result[0]);

    });

};

const createNasabah = (req, res) => {

    Nasabah.createNasabah(
        req.body,
        (err) => {

            if(err){
                return res.status(500).json(err);
            }

            res.status(201).json({
                success:true,
                message:"Nasabah berhasil ditambahkan"
            });

        }
    );

};

const updateNasabah = (req, res) => {

    Nasabah.updateNasabah(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Nasabah tidak ditemukan"
                });
            }

            res.json({
                success: true,
                message: "Data nasabah berhasil diperbarui"
            });

        }
    );

};

const deleteNasabah = (req, res) => {

    Nasabah.deleteNasabah(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Nasabah tidak ditemukan"
                });
            }

            res.json({
                success: true,
                message: "Nasabah berhasil dihapus"
            });

        }
    );

};

module.exports = {
    getNasabah,
    getDashboard,
    getNasabahById,
    createNasabah,
    updateNasabah,
    deleteNasabah
};