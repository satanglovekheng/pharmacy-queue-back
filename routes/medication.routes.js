const express = require("express");
const controller = require("../controllers/medication.controller");

const router = express.Router();

router.post("/", controller.create);
router.get("/pending", controller.pending);
router.get("/completed-today", controller.completedToday);
router.put("/:id/complete", controller.complete);

module.exports = router;
