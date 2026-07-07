import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

import userData from "../ReduxToolkit/Features/User/GetUserData";

import authReducer from "./Features/AuthSlilce";
import userAuth from "./Features/User/UserAuthSlilce";
import ProductSlice from "./Features/User/ProductSlice";
import orderSlice from "./Features/User/orderSlice";
import cartSlice from "./Features/User/cartSlice";
import couponSlice from "./Features/User/couponSlice";
import homeCategorySlice from "./Features/User/homeCategorySlice";
import sellerOrderSlice from "./Features/Seller/sellerOrderSlice";
import sellerProductSlice from "./Features/Seller/sellerProductSlice";
import sellerSlice from "./Features/Seller/SellerSlice";
import adminSlice from "./Features/Admin/adminSlice";
import sellerTransactionSlice from "./Features/Seller/sellerTransactionSlice";
import adminHomeCategorySlice from "./Features/Admin/AdminHomeCategory";
import DealsSlice from "./Features/Admin/DealsSlice";
import adminCoupon from "./Features/Admin/couponSlice";
import adminHomeCategoryReducer from "../ReduxToolkit/Features/Admin/homeCategorySlice";
import mainCategoryReducer from "./Features/Common/mainCategorySlice";
import electronicSlice from "./Features/Admin/electronicSlice";
import shopcategorySlice from "./Features/Admin/shopCategorySlice";
import gridReducer from "./Features/Admin/gridSlice";
import bannerSlice from "./Features/Admin/bannerSlice";
import accessTokenSlice from "./Features/Common/accessTokenSlice";
import adminAuthSllice from "./Features/Admin/adminAuthSlice";
import sellerReportSlice from "./Features/Seller/sellerReportSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userAuth: userAuth,
  userData,
  products: ProductSlice,
  orders: orderSlice,
  cart: cartSlice,
  coupon: couponSlice,
  homeCategory: homeCategorySlice,
  sellerOrder: sellerOrderSlice,
  sellerProducts: sellerProductSlice,
  seller: sellerSlice,
  sellerTransaction: sellerTransactionSlice,
  sellerReport: sellerReportSlice,
  admin: adminSlice,
  adminHomeCatgory: adminHomeCategorySlice,
  deal: DealsSlice,
  accessToken: accessTokenSlice,
  adminCoupon: adminCoupon,
  adminHomeCategory: adminHomeCategoryReducer,
  mainCategory: mainCategoryReducer,
  electronic: electronicSlice,
  shopCategory: shopcategorySlice,
  grid: gridReducer,
  banner: bannerSlice,
  adminAuth: adminAuthSllice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
