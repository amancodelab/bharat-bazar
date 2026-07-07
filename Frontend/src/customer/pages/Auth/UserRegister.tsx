import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import UserLogin from "./UserLogin";
import UserForm from "../../Form/UserForm";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { sendLoginOtp } from "../../../ReduxToolkit/Features/User/UserAuthSlilce";
import UserAccount from "./UserAccount";
import { fetchBannerAll } from "../../../ReduxToolkit/Features/Admin/bannerSlice";
import UserRole from "../../../Common/Data/UserRole";

const UserRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchBannerAll());
  }, []);

  const allBanners = useAppSelector((state) => state.banner.banners);
  const loading = useAppSelector((state) => state.banner.loading);
  const userBanner = allBanners.find(
    (banner) => banner.role === UserRole.CUSTOMER,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await dispatch(
          sendLoginOtp({
            email: values.email,
          }),
        );

        if (sendLoginOtp.fulfilled.match(result)) {
          navigate(`/auth/user/verify/${values.email}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const isVerify = useAppSelector((state) => {
    return state.userAuth.isAuthenticated;
  });

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl text-center">Hero Section is Loading....</h1>
      </div>
    );
  }

  return (
    <>
      {isVerify ? (
        <UserAccount></UserAccount>
      ) : (
        <div
          className="
      h-screen px-2 md:px-4 py-2 md:py-4
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2
    "
        >
          {/* Left Section */}
          <section className="col-span-1 md:h-screen">
            {isLogin ? (
              <div>
                <UserLogin formik={formik} />

                <div className="flex items-center justify-center flex-col text-sm">
                  <h1 className="py-2">Create a new account?</h1>

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
                className="
            lg:pl-10 md:pl-5 md:mt-10
            border-2 md:border-0 border-gray-300
            rounded-xl p-2
          "
              >
                <h1 className="md:text-4xl text-2xl font-medium py-2">
                  Create Account
                </h1>

                <h2 className="text-lg text-teal-600 font-semibold">
                  Join Our Marketplace
                </h2>

                <p className="leading-6 text-sm text-gray-600 mt-4">
                  Create your account and start shopping with ease.
                </p>

                <h1 className="text-lg md:text-2xl font-semibold text-center py-4 md:py-8">
                  User Registration
                </h1>

                <UserForm />

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

          {/* Right Image */}
          <section className="hidden md:block md:col-span-1 lg:col-span-2">
            <div className="w-full h-full">
              <img
                className="sticky top-4 w-full h-full object-cover"
                src={userBanner.image}
                alt="User Register"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UserRegister;
