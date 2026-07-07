import api from "../config/api";
import sellerApi from "../config/sellerApi";
import adminApi from "../config/adminApi";
import UserRole from "../Common/Data/UserRole";

const getApi = (role: string) => {
  switch (role) {
    case UserRole.CUSTOMER:
      return api;

    case UserRole.SELLER:
      return sellerApi;

    case UserRole.ADMIN:
      return adminApi;

    default:
      throw new Error("Invalid user role");
  }
};

export default getApi;
