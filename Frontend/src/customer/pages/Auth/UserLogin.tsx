import { Button, Grid, TextField } from "@mui/material";

interface Props {
  formik: any;
}

const UserLogin = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <h1 className="text-lg logo md:text-2xl text-center">
              Welcome Back
            </h1>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button sx={{ textTransform: "none" }}>Forgot Password?</Button>
          </Grid>
        </Grid>

        <div className="mt-8">
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
