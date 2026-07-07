import { Route, Routes } from "react-router-dom";
import SellerRegister from "../../seller/SellerPage/SellerRegister";

import SellerForm from "../../seller/Form/SellerForm";
import VerifyPage from "../../Common/AuthVerify/VerifyPage";
import UserRegister from "../../customer/pages/Auth/UserRegister";
import UserForm from "../../customer/Form/UserForm";
import UserVerifyPage from "../../Common/AuthVerify/UserVerifyPage";

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/form" element={<SellerForm />} />
        <Route
          path="/seller/login/verify/:email"
          element={<VerifyPage method={"login"} />}
        />
        <Route
          path="/seller/verify/:email"
          element={<VerifyPage method={"register"} />}
        />

        <Route path="/register" element={<UserRegister />} />
        <Route path="/form" element={<UserForm />} />
        <Route
          path="/user/login/verify/:email"
          element={<UserVerifyPage method={"login"} />}
        />
        <Route path="/user/verify/:email" element={<UserVerifyPage />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
