import { Grid, TextField } from "@mui/material";

interface Props {
  formik: any;
}

const SellerStep1 = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="sellerName"
            label="Seller Name"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            required
          />
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
          <TextField
            fullWidth
            name="mobile"
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="GSTIN"
            label="GSTIN"
            value={formik.values.GSTIN}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellerStep1;
