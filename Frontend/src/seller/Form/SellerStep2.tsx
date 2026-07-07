import { Grid, TextField } from "@mui/material";

interface props {
  formik: any;
}

const SellerStep2 = ({ formik }: props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Contact Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Pickup Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.pincode"
            label="Pincode"
            value={formik.values.pickupAddress.pincode}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellerStep2;
