const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Get all predictions
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                p.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM landslide_predictions p
            JOIN locations l ON p.location_id = l.id
            ORDER BY p.predicted_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch predictions",
            error: error.message
        });
    }
});


// Get latest prediction for a location
router.get("/latest/:location_id", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                p.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM landslide_predictions p
            JOIN locations l ON p.location_id = l.id
            WHERE p.location_id = ?
            ORDER BY p.predicted_at DESC
            LIMIT 1
        `, [req.params.location_id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No prediction found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch latest prediction",
            error: error.message
        });
    }
});


// Add prediction
router.post("/", async (req, res) => {
    try {
        const {
            location_id,
            risk_level,
            probability,
            prediction,
            model_version
        } = req.body;

        const [result] = await pool.query(`
            INSERT INTO landslide_predictions
            (
                location_id,
                risk_level,
                probability,
                prediction,
                model_version
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            location_id,
            risk_level,
            probability,
            prediction,
            model_version
        ]);

        res.status(201).json({
            message: "Prediction added successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add prediction",
            error: error.message
        });
    }
});


module.exports = router;
