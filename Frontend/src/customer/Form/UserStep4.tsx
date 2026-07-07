import { Divider, Grid, Typography } from "@mui/material";

interface Props {
  formik: any;
}

const UserStep4 = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Review Your Details
          </Typography>

          <Divider sx={{ mt: 1, mb: 2 }} />
        </Grid>

        {/* Personal Details */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Personal Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Name: {formik.values.name}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Email: {formik.values.email}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Mobile: {formik.values.mobile}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        {/* Address Details */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Address Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Contact Name: {formik.values.address?.name}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Address: {formik.values.address?.address}</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>Locality: {formik.values.address?.locality}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>City: {formik.values.address?.city}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>State: {formik.values.address?.state}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>Pincode: {formik.values.address?.pincode}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography>
            Address Mobile: {formik.values.address?.mobile}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        {/* Profile Image */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Profile Information
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography>
            Profile Image:{" "}
            {formik.values.profileImage
              ? formik.values.profileImage.name || "Uploaded"
              : "Not Uploaded"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserStep4;
