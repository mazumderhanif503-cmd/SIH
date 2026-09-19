const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Get all telemetry data
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                t.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM telemetry t
            JOIN locations l ON t.location_id = l.id
            ORDER BY t.recorded_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch telemetry data",
            error: error.message
        });
    }
});


// Get latest telemetry of a particular location
router.get("/latest/:location_id", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                t.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM telemetry t
            JOIN locations l ON t.location_id = l.id
            WHERE t.location_id = ?
            ORDER BY t.recorded_at DESC
            LIMIT 1
        `, [req.params.location_id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No telemetry data found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch latest telemetry",
            error: error.message
        });
    }
});


// Add telemetry data
router.post("/", async (req, res) => {
    try {
        const {
            location_id,
            rainfall,
            soil_moisture,
            temperature,
            humidity,
            soil_tilt,
            vibration
        } = req.body;

        const [result] = await pool.query(`
            INSERT INTO telemetry
            (
                location_id,
                rainfall,
                soil_moisture,
                temperature,
                humidity,
                soil_tilt,
                vibration
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            location_id,
            rainfall,
            soil_moisture,
            temperature,
            humidity,
            soil_tilt,
            vibration
        ]);

        res.status(201).json({
            message: "Telemetry data added successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add telemetry data",
            error: error.message
        });
    }
});


module.exports = router;
