import { Button, Grid, TextField } from "@mui/material";

interface Props {
  formik: any;
}

const SellerStep4 = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="businessDetails.businessEmail"
            label="Business Email"
            type="email"
            value={formik.values.businessDetails.businessEmail}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="businessDetails.businessMobile"
            label="Business Mobile"
            value={formik.values.businessDetails.businessMobile}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button component="label" variant="outlined" fullWidth>
            Upload Logo
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  formik.setFieldValue("businessDetails.logo", file);
                }
              }}
            />
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button component="label" variant="outlined" fullWidth>
            Upload Banner Images
            <input
              hidden
              multiple
              accept="image/*"
              type="file"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                formik.setFieldValue("businessDetails.banner", files);
              }}
            />
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            name="businessDetails.businessAddress"
            label="Business Address"
            value={formik.values.businessDetails.businessAddress}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellerStep4;
