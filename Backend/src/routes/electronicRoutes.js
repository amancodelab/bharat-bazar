

const express = require("express");
const router = express.Router();

const ElectronicController = require("../controllers/ElectronicController");

// Create
router.post("/add", ElectronicController.createElectronic);

// Get All
router.get("/", ElectronicController.getElectronics);

// Get Single
router.get("/:id", ElectronicController.getElectronicById);

// Update
router.put("/update/:id", ElectronicController.updateElectronic);

// Delete
router.delete("/delete/:id", ElectronicController.deleteElectronic);

module.exports = router;

