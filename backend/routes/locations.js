const express = require("express");
const router = express.Router();

const pool = require("../config/db.js");

// GET all locations
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM locations ORDER BY created_at DESC"
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch locations",
            error: error.message
        });
    }
});


// GET location by ID
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM locations WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Location not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch location",
            error: error.message
        });
    }
});


// POST new location
router.post("/", async (req, res) => {
    try {
        const {
            name,
            district,
            state,
            latitude,
            longitude,
            elevation
        } = req.body;

        const [result] = await pool.query(
            `INSERT INTO locations
            (name, district, state, latitude, longitude, elevation)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                district,
                state,
                latitude,
                longitude,
                elevation
            ]
        );

        res.status(201).json({
            message: "Location created successfully",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create location",
            error: error.message
        });
    }
});

module.exports = router;
