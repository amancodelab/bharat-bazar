import { Grid, TextField } from "@mui/material";

interface Props {
  formik: any;
}

const UserStep2 = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="address.name"
            label="Contact Name"
            value={formik.values.address.name}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="address.mobile"
            label="Mobile Number"
            value={formik.values.address.mobile}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="address.pincode"
            label="Pincode"
            value={formik.values.address.pincode}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="address.address"
            label="Address"
            value={formik.values.address.address}
            onChange={formik.handleChange}
            required
            multiline
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="address.city"
            label="City"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="address.state"
            label="State"
            value={formik.values.address.state}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="address.locality"
            label="Locality"
            value={formik.values.address.locality}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserStep2;
