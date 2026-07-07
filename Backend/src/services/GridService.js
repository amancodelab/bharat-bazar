const Grid = require("../models/GridModel");

class GridService {
  // Create Grid
  async createGrid(data) {
    // Maximum 6 Grid Items
    const totalGrid = await Grid.countDocuments();

    if (totalGrid >= 6) {
      throw new Error("Maximum 6 Grid items are allowed.");
    }

    // Check duplicate position
    const existingPosition = await Grid.findOne({
      position: data.position,
    });

    if (existingPosition) {
      throw new Error(
        `Position ${data.position} is already occupied.`
      );
    }

    // Check duplicate category
    const existingCategory = await Grid.findOne({
      level1: data.level1,
      level2: data.level2,
      level3: data.level3 || "",
    });

    if (existingCategory) {
      throw new Error(
        "This category already exists in Grid."
      );
    }

    const grid = new Grid(data);

    return await grid.save();
  }

  // Get All Grids
  async getGrids() {
    return await Grid.find().sort({
      position: 1,
    });
  }

  // Get Single Grid
  async getGridById(id) {
    const grid = await Grid.findById(id);

    if (!grid) {
      throw new Error("Grid not found.");
    }

    return grid;
  }

  // Update Grid
  async updateGrid(id, data) {
    // Check duplicate position
    const existingPosition = await Grid.findOne({
      position: data.position,
      _id: { $ne: id },
    });

    if (existingPosition) {
      throw new Error(
        `Position ${data.position} is already occupied.`
      );
    }

    // Check duplicate category
    const existingCategory = await Grid.findOne({
      level1: data.level1,
      level2: data.level2,
      level3: data.level3 || "",
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new Error(
        "This category already exists in Grid."
      );
    }

    const updatedGrid = await Grid.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGrid) {
      throw new Error("Grid not found.");
    }

    return updatedGrid;
  }

  // Delete Grid
  async deleteGrid(id) {
    const deletedGrid = await Grid.findByIdAndDelete(id);

    if (!deletedGrid) {
      throw new Error("Grid not found.");
    }

    return deletedGrid;
  }
}

module.exports = new GridService();