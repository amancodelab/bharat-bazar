import { Route, Routes } from "react-router-dom";
import AdminHome from "../../admin/HomePage/AdminHome";
import Coupon from "../../admin/Coupon/Coupon";
import AddNewCoupon from "../../admin/Coupon/AddNewCoupon";

import Deals from "../../admin/Deals/Deals";
import Account from "../../admin/pages/Auth/Account";
import ElectronicsCategory from "../../admin/pages/Electronics/ElectronicsCategory";
import AdminOutlet from "../../admin/Navbar/AdminOutlet";
import LogoutPage from "../../admin/pages/LogoutPage";
import Dashboard from "../../admin/Dashboard/Dashboard";
import CreateHomeCategory from "../../admin/Home/CreateHomeCategory";
import EditElectronic from "../../admin/pages/Electronics/EditElectronic";
import ShopByCategory from "../../admin/pages/ShopByCategory/ShopByCategory";
import Grid from "../../admin/pages/Grid/Grid";
import EditGrid from "../../admin/pages/Grid/EditGrid";
import EditShopCategory from "../../admin/pages/ShopByCategory/EditShopCategory";
import HeroSection from "../../admin/HeroSection/HeroSection";
import EditHeroSection from "../../admin/HeroSection/EditHeroSection";
import EditDeal from "../../admin/Deals/EditDeal";
import EditCoupon from "../../admin/Coupon/EditCoupon";
import SellerAccountChange from "../../admin/Seller/SellerAccountChange";
import AdminLogin from "../../admin/pages/Auth/AdminLogin";
import VerifyPage from "../../admin/pages/Auth/VerifyPage";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminOutlet />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/add-coupon" element={<AddNewCoupon />} />
          <Route path="/electric-category" element={<ElectronicsCategory />} />
          <Route
            path="/home-category/create"
            element={<CreateHomeCategory />}
          />
          <Route
            path="/electric-category/edit/:id"
            element={<EditElectronic />}
          />

          <Route path="/shop-category" element={<ShopByCategory />} />
          <Route path="/grid" element={<Grid />} />

          <Route path="/verify/:method/:email" element={<VerifyPage />} />

          <Route
            path="/shop-category/edit/:id"
            element={<EditShopCategory />}
          />
          <Route
            path="/seller/accountstatus/:accountstatus/edit/:id"
            element={<SellerAccountChange />}
          />
          <Route path="/hero-section/edit/:id" element={<EditHeroSection />} />

          <Route path="/hero-section" element={<HeroSection />} />
          <Route path="/grid/edit/:id" element={<EditGrid />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/edit/:id" element={<EditDeal />} />
          <Route path="/coupon/edit/:id" element={<EditCoupon />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<AdminHome />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRoute;
