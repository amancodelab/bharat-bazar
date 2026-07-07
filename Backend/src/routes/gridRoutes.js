const router = require("express").Router();
const GridController = require("../controllers/GridController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

// Create
router.post("/add", adminAuthMiddleware, GridController.createGrid);

// Get All
router.get("/", GridController.getGrids);

// Get By Id
router.get("/:id", GridController.getGridById);

// Update
router.put("/update/:id", adminAuthMiddleware, GridController.updateGrid);

// Delete
router.delete("/delete/:id", adminAuthMiddleware, GridController.deleteGrid);

module.exports = router;