import { ThemeProvider } from "@mui/material";
import "./App.css";
import { customTheme } from "./theme/customTheme";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/customer/CustomerRoutes.tsx";
import SellerRoutes from "./Routes/Seller/SellerRoutes.tsx";
import AuthRoutes from "./Routes/Auth/AuthRoutes.tsx";
import AdminRoute from "./Routes/Admin/AdminRoute.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./ReduxToolkit/store.tsx";
import { fetchHompage } from "./ReduxToolkit/Features/User/homeCategorySlice.tsx";
import { fetchMainCategories } from "./ReduxToolkit/Features/Common/mainCategorySlice.tsx";
import { fetchGrids } from "./ReduxToolkit/Features/Admin/gridSlice.tsx";
import { fetchElectronics } from "./ReduxToolkit/Features/Admin/electronicSlice.tsx";
import { fetchCategories } from "./ReduxToolkit/Features/Admin/homeCategorySlice.tsx";
import { fetchBannerAll } from "./ReduxToolkit/Features/Admin/bannerSlice.tsx";
import { fetchAllDeals } from "./ReduxToolkit/Features/Admin/DealsSlice.tsx";
import { fetchShopCategories } from "./ReduxToolkit/Features/Admin/shopCategorySlice.tsx";
import {
  GetuserData,
  GetUserProfile,
} from "./ReduxToolkit/Features/User/GetUserData.tsx";
import { fetchAdminProfile } from "./ReduxToolkit/Features/Admin/adminAuthSlice.tsx";
import {
  fetchSellerById,
  getSellerProfile,
} from "./ReduxToolkit/Features/Seller/SellerSlice.tsx";

function App() {
  const dispatch = useAppDispatch();
  const isSellerAuth = useAppSelector(
    (state) => state.auth.isSellerAuthenticated,
  );
  useEffect(() => {
    dispatch(fetchHompage());
    dispatch(fetchMainCategories());
    dispatch(fetchGrids());
    dispatch(fetchElectronics());
    dispatch(fetchCategories());
    dispatch(fetchShopCategories());
    dispatch(fetchBannerAll());
    dispatch(GetUserProfile());
    dispatch(GetuserData());
    dispatch(fetchAllDeals());
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("seller_jwt")) {
      dispatch(getSellerProfile());
      dispatch(fetchSellerById(localStorage.getItem("sellerId")));
    }
  }, [dispatch, isSellerAuth]);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <div>
          <Routes>
            <Route path="/seller/*" element={<SellerRoutes />} />
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/admin/*" element={<AdminRoute />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
