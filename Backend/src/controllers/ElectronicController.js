
const ElectronicService = require("../services/ElectronicService");

class ElectronicController {
  // Create Electronic
  async createElectronic(req, res) {
    try {
      const electronic = await ElectronicService.createElectronic(req.body);

      res.status(201).json({
        status: true,
        msg: "Electronic category created successfully",
        data: electronic,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Get All Electronics
  async getElectronics(req, res) {
    try {
      const electronics = await ElectronicService.getElectronics();

      res.status(200).json({
        status: true,
        data: electronics,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Get Single Electronic
  async getElectronicById(req, res) {
    try {
      const electronic = await ElectronicService.getElectronicById(
        req.params.id
      );

      if (!electronic) {
        return res.status(404).json({
          status: false,
          msg: "Electronic category not found",
        });
      }

      res.status(200).json({
        status: true,
        data: electronic,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Update Electronic
  async updateElectronic(req, res) {
    try {
      const electronic = await ElectronicService.updateElectronic(
        req.params.id,
        req.body
      );

      if (!electronic) {
        return res.status(404).json({
          status: false,
          msg: "Electronic category not found",
        });
      }

      res.status(200).json({
        status: true,
        msg: "Electronic category updated successfully",
        data: electronic,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }

  // Delete Electronic
  async deleteElectronic(req, res) {
    try {
      const electronic = await ElectronicService.deleteElectronic(
        req.params.id
      );

      if (!electronic) {
        return res.status(404).json({
          status: false,
          msg: "Electronic category not found",
        });
      }

      res.status(200).json({
        status: true,
        msg: "Electronic category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  }
}

module.exports = new ElectronicController();
