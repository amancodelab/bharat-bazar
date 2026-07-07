import { Alert, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { adminLogin } from "../../../ReduxToolkit/Features/Admin/adminAuthSlice";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: any) => state.adminAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Enter a valid email";
      }

      return errors;
    },

    onSubmit: async (values) => {
      const result = await dispatch(adminLogin(values));

      if (adminLogin.fulfilled.match(result)) {
        navigate(`/admin/verify/login/${values.email}`);
      }
    },
  });

  return (
    <div className="flex justify-center items-center  px-5">
      <section className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Admin Login</h1>

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
                required
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                {loading ? "Sending OTP..." : "Login"}
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/admin/account")}
              >
                Create New Admin Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default AdminLogin;
