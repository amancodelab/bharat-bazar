import { Button, Grid, TextField } from "@mui/material";

interface Props {
  formik: any;
}

const SellerLogin = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <h1 className="text-lg logo md:text-2xl text-center">Welcome Back</h1>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              label="Mobile"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              label="Email"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              label="Password"
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Button sx={{ textTransform: "none" }}>Forget Password</Button>
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

export default SellerLogin;
