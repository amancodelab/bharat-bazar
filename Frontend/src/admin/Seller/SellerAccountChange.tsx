import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { accountStatuses } from "./SellerTable";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { updateSellerAccountStatus } from "../../ReduxToolkit/Features/Admin/adminSlice";
import { useState } from "react";

const SellerAccountChange = () => {
  const { accountstatus, id } = useParams();
  console.log(accountstatus, "account status");
  console.log("id", id);
  if (!accountstatus || !id) {
    return (
      <div>
        <h1 className="text-2xl text-center">No Such Seller is found</h1>
      </div>
    );
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const statues = accountStatuses.filter((status) => status.value !== "all");
  const formik = useFormik({
    initialValues: {
      status: accountstatus,
    },

    onSubmit: async (values) => {
      const result = await dispatch(
        updateSellerAccountStatus({
          id,
          accountStatus: values.status,
        }),
      );

      if (updateSellerAccountStatus.fulfilled.match(result)) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        setErrorMessage("Failed to update seller account status.");
      }
    },
  });

  const navigate = useNavigate();

  return (
    <div className="px-2 md:px-5 lg:px-15 w-screen h-screen">
      <div className=" w-90 h-90 flex justify-center items-center flex-col">
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setSuccess(false)}
          >
            Seller account updated successfully.
          </Alert>
        )}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}
        <div className="w-72 md:w-108 px-4 py-4  ">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <TextField
                label="Seller Id"
                id={id}
                value={id}
                disabled={true}
                variant="outlined"
              />

              <FormControl fullWidth>
                <InputLabel id="status-label">Account Status</InputLabel>

                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  label="Account Status"
                  onChange={formik.handleChange}
                >
                  {statues.map((status) => (
                    <MenuItem key={status.name} value={status.value}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                sx={{ mt: 2 }}
                fullWidth
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate(`/admin/dashboard`)}
              className="px-8 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-600 transition-colors duration-150 m-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAccountChange;
