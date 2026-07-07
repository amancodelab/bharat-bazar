import { Button } from "@mui/material";
import { useState } from "react";
import SellerForm from "../Form/SellerForm";
import SellerLogin from "./SellerLogin";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { useNavigate } from "react-router-dom";

import {
  sendLoginOtp,
  sendSignUpOtp,
} from "../../ReduxToolkit/Features/AuthSlilce";
import UserRole from "../../Common/Data/UserRole";

const SellerRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const allBanners = useAppSelector((state) => state.banner.banners);
  const sellerBannner = allBanners.find(
    (banner) => banner.role === UserRole.SELLER,
  );
  const formik = useFormik({
    initialValues: {
      sellerName: "",
      mobile: "",
      password: "",
      email: "",
    },

    onSubmit: async (values) => {
      try {
        if (isLogin) {
          const result = await dispatch(
            sendLoginOtp({
              email: values.email,
            }),
          );

          if (sendLoginOtp.fulfilled.match(result)) {
            navigate(`/auth/seller/login/verify/${values.email}`);
          }
        } else {
          const result = await dispatch(
            sendSignUpOtp({
              sellerName: values.sellerName,
              email: values.email,
              mobile: values.mobile,
              password: values.password,
            }),
          );

          if (sendSignUpOtp.fulfilled.match(result)) {
            navigate(`/auth/seller/verify/${values.email}`);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div
      className="h-screen px-2 md:px-4 py-2 md:py-4
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      {/* Left Side */}
      <section className="col-span-1 md:h-screen">
        {isLogin ? (
          <div>
            <SellerLogin formik={formik} />

            <div className="flex items-center justify-center text-sm flex-col">
              <h1 className="py-2">Create a new Account?</h1>

              <Button
                variant="contained"
                fullWidth
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="lg:pl-10 md:pl-5 md:mt-10
            border-2 md:border-0 border-gray-300
            rounded-xl p-2"
          >
            <h1 className="md:text-4xl text-2xl font-medium py-2">
              {sellerBannner?.buttonText}
            </h1>

            <h2 className="text-lg text-teal-600 font-semibold">
              {sellerBannner.title}
            </h2>

            <p className="leading-6 text-sm text-gray-600 mt-4">
              {sellerBannner.subtitle}
            </p>

            <h1
              className="text-lg md:text-2xl font-semibold
              text-center py-4 md:py-8"
            >
              Contact Details
            </h1>

            <SellerForm />

            <div className="flex items-center justify-center text-sm flex-col">
              <h1 className="py-2">Already have an account?</h1>

              <Button
                variant="contained"
                fullWidth
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Right Side Image */}
      <section className="hidden md:block md:col-span-1 lg:col-span-2">
        <div className="w-full h-full">
          <img
            className="sticky top-4 w-full h-full object-cover"
            src={sellerBannner.image}
            alt="Seller Register"
          />
        </div>
      </section>
    </div>
  );
};

export default SellerRegister;
