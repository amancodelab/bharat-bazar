import { Alert, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { verifyAdminOtp } from "../../../ReduxToolkit/Features/Admin/adminAuthSlice";

const VerifyPage = () => {
  const { email, method } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: any) => state.adminAuth);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: email || "",
      otp: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.otp.trim()) {
        errors.otp = "OTP is required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      const result = await dispatch(
        verifyAdminOtp({
          email: values.email,
          otp: values.otp,
          method: method || "signup",
        }),
      );

      if (verifyAdminOtp.fulfilled.match(result)) {
        navigate("/admin/dashboard");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <section className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-center text-3xl font-bold mb-6">
          OTP Verification
        </h1>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
                required
                id="otp"
                name="otp"
                label="Enter OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/admin/login")}
              >
                Back to Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default VerifyPage;
