const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db.js");
const locationsRoutes = require("./routes/locations");
const telemetryRoutes = require("./routes/telemetry");
const predictionsRoutes = require("./routes/predictions");
const alertsRoutes = require("./routes/alerts");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/locations", locationsRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/predictions", predictionsRoutes);
app.use("/api/alerts", alertsRoutes);


























// Database test
app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT 1 AS connected"
        );

        res.json({
            message: "Database connected successfully",
            result: rows
        });

    } catch (error) {
        console.error("Database Error:", error);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});


// Location API
app.use("/api/locations", locationsRoutes);


// About
app.get("/about", (req, res) => {
    res.json({
        message: "NER Landslide Backend is running 🚀"
    });
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
