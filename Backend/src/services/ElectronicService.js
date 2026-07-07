
const ElectronicModel = require("../models/ElectronicModel");

class ElectronicService {
  // Create
  async createElectronic(data) {
    const electronic = await ElectronicModel.create(data);

    return electronic;
  }

  // Get All
  async getElectronics() {
    return await ElectronicModel.find().populate("categoryId").sort({
      createdAt: -1,
    });
  }

  // Get By Id
  async getElectronicById(id) {
    return await ElectronicModel.findById(id);
  }

  // Update
  async updateElectronic(id, data) {
    return await ElectronicModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  // Delete
  async deleteElectronic(id) {
    return await ElectronicModel.findByIdAndDelete(id);
  }
}

module.exports = new ElectronicService();

