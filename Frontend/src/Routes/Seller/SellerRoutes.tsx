import { Route, Routes } from "react-router-dom";
import SellerDashboard from "../../seller/SellerDashBorad.tsx/SellerDashboard";
import SellerHero from "../../seller/SellerHeroSerction.jsx/SellerHero";
import SellerOrder from "../../seller/SellerPage/SellerOrder";
import SellerProduct from "../../seller/SellerPage/SellerProduct";
import SellerAddPrdouct from "../../seller/SellerPage/SellerAddPrdouct";
import SellerPayment from "../../seller/SellerPage/SellerPayment";

import SellerAccount from "../../seller/SellerPage/SellerAccount";
import SellerLogout from "../../seller/SellerPage/SellerLogout";
import SellerLayout from "./SellerLayout";
import SellerTransaction from "../../seller/SellerPage/SellerTransation";
import ErrorPage from "../../Common/ErrorPage";

const SellerRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<SellerLayout />}>
          <Route index element={<SellerHero />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="orders" element={<SellerOrder />} />
          <Route path="products" element={<SellerProduct />} />
          <Route path="add-product" element={<SellerAddPrdouct />} />
          <Route path="payments" element={<SellerPayment />} />
          <Route path="transactions" element={<SellerTransaction />} />
          <Route path="account" element={<SellerAccount />} />
          <Route path="logout" element={<SellerLogout />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default SellerRoutes;
