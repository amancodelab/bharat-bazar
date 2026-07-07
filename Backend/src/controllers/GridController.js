const GridService = require("../services/GridService");

class GridController {
  // Create Grid
  async createGrid(req, res) {
    try {
      const grid = await GridService.createGrid(req.body);

      return res.status(201).json({
        status: true,
        msg: "Grid created successfully.",
        data: grid,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Get All Grids
  async getGrids(req, res) {
    try {
      const grids = await GridService.getGrids();

      return res.status(200).json({
        status: true,
        data: grids,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Get Grid By Id
  async getGridById(req, res) {
    try {
      const { id } = req.params;

      const grid = await GridService.getGridById(id);

      return res.status(200).json({
        status: true,
        data: grid,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Update Grid
  async updateGrid(req, res) {
    try {
      const { id } = req.params;

      const updatedGrid = await GridService.updateGrid(
        id,
        req.body
      );

      return res.status(200).json({
        status: true,
        msg: "Grid updated successfully.",
        data: updatedGrid,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Delete Grid
  async deleteGrid(req, res) {
    try {
      const { id } = req.params;

      await GridService.deleteGrid(id);

      return res.status(200).json({
        status: true,
        msg: "Grid deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }
}

module.exports = new GridController();