import { Button, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserStep1 from "./UserStep1";
import UserStep2 from "./UserStep2";
import UserStep3 from "./UserStep3";
import UserStep4 from "./UserStep4";

import { useAppDispatch } from "../../ReduxToolkit/store";
import { sendSignUpOtp } from "../../ReduxToolkit/Features/User/UserAuthSlilce";

export const steps = [
  "Personal Details",
  "Address Details",
  "Profile Details",
  "Review & Submit",
];

const UserForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      profileImage: "",
      address: {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        locality: "",
        mobile: "",
      },
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCreateAccount = async () => {
    try {
      console.log("User Registration Data:", formik.values);

      const result = await dispatch(
        sendSignUpOtp({
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
          mobile: formik.values.mobile,
          profileImage: formik.values.profileImage,

          address: {
            name: formik.values.address.name,
            address: formik.values.address.address,
            city: formik.values.address.city,
            state: formik.values.address.state,
            pincode: Number(formik.values.address.pincode),
            locality: formik.values.address.locality,
            mobile: formik.values.address.mobile,
          },
        } as any),
      );

      if (sendSignUpOtp.fulfilled.match(result)) {
        setOpenSnackbar(true);
        navigate(`/auth/user/verify/${formik.values.email}`);
      }
    } catch (error) {
      console.error("Signup OTP Error:", error);
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 ? (
        <UserStep1 formik={formik} />
      ) : activeStep === 1 ? (
        <UserStep2 formik={formik} />
      ) : activeStep === 2 ? (
        <UserStep3 formik={formik} />
      ) : (
        <UserStep4 formik={formik} />
      )}

      <div className="flex items-center justify-between mt-5">
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={async () => {
            if (activeStep === steps.length - 1) {
              await handleCreateAccount();
            } else {
              setActiveStep(activeStep + 1);
            }
          }}
        >
          {activeStep === steps.length - 1 ? "Create Account" : "Next"}
        </Button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Otp send Successfully"
      />
    </div>
  );
};

export default UserForm;
