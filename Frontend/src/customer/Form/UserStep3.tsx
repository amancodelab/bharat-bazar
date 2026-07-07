import { Button, Grid, Typography } from "@mui/material";

interface Props {
  formik: any;
}

const UserStep3 = ({ formik }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Button component="label" variant="outlined" fullWidth>
            Upload Profile Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  formik.setFieldValue("profileImage", file.name);
                }
              }}
            />
          </Button>
        </Grid>

        {formik.values.profileImage && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2">
              Selected: {formik.values.profileImage.name}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default UserStep3;
