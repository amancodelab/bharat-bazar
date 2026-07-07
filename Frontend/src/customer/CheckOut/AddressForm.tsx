import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { GetuserData } from "../../ReduxToolkit/Features/User/GetUserData";

interface AddressFormProps {
  handleClose: () => void;
}

const AddressForm = ({ handleClose }: AddressFormProps) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
      district: "",
      state: "",
      pincode: "",
      country: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      if (!jwt) {
        return (
          <div>
            <h1>Please Login or Register First</h1>
          </div>
        );
      }
      // Refresh user so newly added address appears
      await dispatch(GetuserData());

      handleClose();
    },
  });

  return (
    <div>
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <p className="text-xl font-semibold text-center pb-5">
          Contact Details
        </p>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="district"
                label="District"
                value={formik.values.district}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="pincode"
                label="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                className="text-center rounded-xl"
                type="submit"
                variant="contained"
                fullWidth
              >
                Add Address
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default AddressForm;
