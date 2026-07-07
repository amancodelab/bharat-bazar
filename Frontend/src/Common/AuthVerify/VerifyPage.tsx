import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import {
  verifyLoginOtp,
  verifySignupOtp,
} from "../../ReduxToolkit/Features/AuthSlilce";

interface Props {
  method?: "login" | "register";
}

const VerifyPage = ({ method = "login" }: Props) => {
  const { email } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((store) => store.auth);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: email || "",
      otp: "",
    },

    onSubmit: async (values) => {
      try {
        let result;
        console.log("Verification page work is starting");
        if (method === "login") {
          console.log("Login");
          result = await dispatch(
            verifyLoginOtp({
              email: values.email,
              otp: values.otp,
            }),
          );
          console.log("Before otp is Verified");
          if (verifyLoginOtp.fulfilled.match(result)) {
            console.log("Navigation running");
            navigate("/seller/dashboard");
          }
        } else {
          result = await dispatch(
            verifySignupOtp({
              email: values.email,
              otp: values.otp,
            }),
          );

          if (verifySignupOtp.fulfilled.match(result)) {
            navigate("/seller/dashboard");
          }
        }
      } catch (error) {
        console.log("OTP Verification Error:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <section className="max-w-md w-full">
        <div className="w-full mb-6">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://images.pexels.com/photos/5585800/pexels-photo-5585800.jpeg"
            alt="Verification"
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                value={formik.values.email}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="otp"
                name="otp"
                label="Enter OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                required
              />
            </Grid>

            {error && (
              <Grid size={{ xs: 12 }}>
                <p className="text-red-500 text-sm">{error}</p>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default VerifyPage;
