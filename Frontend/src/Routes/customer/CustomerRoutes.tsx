import { Route, Routes } from "react-router-dom";
import Products from "../../customer/pages/productPage/Products";

import CheckOut from "../../customer/CheckOut/CheckOut";
import Navbar from "../../customer/Navbar/Navbar";
import Footer from "../../customer/Footer/Footer";
import OrderDetails from "../../customer/Profile/OrderDetails";
import HomeRoutes from "./HomeRoutes";
import AccountLayout from "../../customer/Profile/AccountLayout";
import Order from "../../customer/Profile/Order";

import Addresses from "../../customer/Profile/Addresses";
import LogoutButton from "../../customer/Profile/Logout.Button";

import Profile from "../../customer/Profile/Profile";
import ProductDetails from "../../customer/pages/ProductDetails/ProductDetails";
import FullCard from "../../customer/Card/FullCard";
import PaymentSuccess from "../../customer/Profile/PaymentSuccess";
import UserAccount from "../../customer/pages/Auth/UserAccount";

const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/product/category/:category" />
        <Route path="/product/:productId" element={<Products />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/cart" element={<FullCard />} />
        <Route path="/account/details" element={<UserAccount />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/" element={<HomeRoutes />} />
        <Route
          path="/payment-success/:paymentOrderId"
          element={<PaymentSuccess />}
        />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="orders" element={<Order />} />
          <Route path="cart" element={<FullCard />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="logout" element={<LogoutButton />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default CustomerRoutes;
