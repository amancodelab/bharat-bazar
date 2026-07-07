
const AccountStatus = require("../domain/AccouontStatus");
const UserRole = require("../domain/UserRole");

const Admin = require("../models/Admin");
const bcryptHash = require("../utils/Auth/bcryptHash");


class AdminServices {
  async createAdmin(adminData) {
    try {
      if (adminData.role) {
        if (adminData.role !== UserRole.ADMIN) {
          throw new Error("Please Registerd as Admin")
        }
      };

      adminData.email = adminData.email.toLowerCase().trim();

      const isadmin = await Admin.findOne({ email: adminData.email });

      // check the admin Account Account status
      if (isadmin) {
        if (isadmin.accountStatus === AccountStatus.PENDING_VERFICATION) {
          await this.deleteAdmin(adminData.email);
        } else {
          throw new Error('Admin Already Registered')
        }
      }

      const hashPassword = await bcryptHash(adminData.password);

      const admin = await Admin.create({
        name: adminData.name,
        email: adminData.email,
        password: hashPassword,
        role: UserRole.ADMIN
      });

      if (!admin) {
        throw new Error('Failed during the creating the Admin')
      }

      return admin

    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create Admin: ${error.message}`);
    }
  }

  // get Admin from email
  async fetchAdmin(email) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error("No Admin Found");

      }

      return admin;

    } catch (error) {
      console.log(error.message);
      throw new Error(`Error from the Admin fetchAdmin:${error.message}`)
    }
  }
  // delete Admin from email
  async deleteAdmin(email) {
    try {
      const admin = await Admin.findOneAndDelete({ email });
      if (!admin) {
        throw new Error("Failed to deleted the Admin");
      }
      return admin;

    } catch (error) {
      console.log(error.message);
      throw new Error(`Error from the Admin DeleteAdmin:${error.message}`);
    }
  }

}


module.exports = new AdminServices();