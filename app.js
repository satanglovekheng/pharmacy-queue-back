const express = require("express");
const cors = require("cors");
const medicationRoutes = require("./routes/medication.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medications", medicationRoutes);

module.exports = app;
