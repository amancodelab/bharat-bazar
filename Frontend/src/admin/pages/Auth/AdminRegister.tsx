import { Alert, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { registerAdmin } from "../../../ReduxToolkit/Features/Admin/adminAuthSlice";

const AdminRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: any) => state.adminAuth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      }

      if (!values.email.trim()) {
        errors.email = "Email is required";
      }

      if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return errors;
    },

    onSubmit: async (values) => {
      const result = await dispatch(registerAdmin(values));

      if (registerAdmin.fulfilled.match(result)) {
        navigate(`/admin/verify/signup/${values.email}`);
      }
    },
  });

  return (
    <div className="flex justify-center items-center mt-10 md:mt-20 px-5">
      <section className="max-w-md w-full border rounded-xl shadow-lg p-6 bg-white">
        <h1 className="text-center text-3xl font-bold mb-6">
          Admin Registration
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
                required
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                {loading ? "Registering..." : "Register Admin"}
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/admin/login")}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default AdminRegister;
