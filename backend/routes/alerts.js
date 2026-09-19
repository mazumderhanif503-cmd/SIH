const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Get all alerts
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                a.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM alerts a
            JOIN locations l ON a.location_id = l.id
            ORDER BY a.created_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch alerts",
            error: error.message
        });
    }
});


// Get active alerts only
router.get("/active", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                a.*,
                l.name AS location_name,
                l.district,
                l.state
            FROM alerts a
            JOIN locations l ON a.location_id = l.id
            WHERE a.is_resolved = FALSE
            ORDER BY a.created_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch active alerts",
            error: error.message
        });
    }
});


// Add alert
router.post("/", async (req, res) => {
    try {
        const {
            location_id,
            prediction_id,
            alert_type,
            title,
            message
        } = req.body;

        const [result] = await pool.query(`
            INSERT INTO alerts
            (
                location_id,
                prediction_id,
                alert_type,
                title,
                message
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            location_id,
            prediction_id,
            alert_type,
            title,
            message
        ]);

        res.status(201).json({
            message: "Alert created successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create alert",
            error: error.message
        });
    }
});


// Resolve an alert
router.patch("/:id/resolve", async (req, res) => {
    try {
        const [result] = await pool.query(`
            UPDATE alerts
            SET
                is_resolved = TRUE,
                resolved_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Alert not found"
            });
        }

        res.json({
            message: "Alert resolved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to resolve alert",
            error: error.message
        });
    }
});


module.exports = router;
