import { Grid, TextField } from "@mui/material";

interface props {
  formik: any;
}

const SellerStep3 = ({ formik }: props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="bankDetails.accountHolderName"
            label="Account Holder Name"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="bankDetails.accountNumber"
            label="Account Number"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="bankDetails.bankName"
            label="Bank Name"
            value={formik.values.bankDetails.bankName}
            onChange={formik.handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="bankDetails.ifscCode"
            label="IFSC Code"
            value={formik.values.bankDetails.ifscCode}
            onChange={formik.handleChange}
            required
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellerStep3;
