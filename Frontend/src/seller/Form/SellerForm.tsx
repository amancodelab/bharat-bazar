import { Button, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SellerStep1 from "./SellerStep1";
import SellerStep2 from "./SellerStep2";
import SellerStep3 from "./SellerStep3";
import SellerStep4 from "./SellerStep4";

import { useAppDispatch } from "../../ReduxToolkit/store";
import { sendSignUpOtp } from "../../ReduxToolkit/Features/AuthSlilce";

export const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Business Details",
];

const SellerForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      profileImage: "",
      mobile: "",
      email: "",
      password: "",
      GSTIN: "",

      pickupAddress: {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        locality: "",
        mobile: "",
      },

      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
      },

      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
        logo: "",
        banner: [],
      },
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCreateAccount = async () => {
    try {
      console.log("Seller Registration Data:", formik.values);

      const result = await dispatch(
        sendSignUpOtp({
          sellerName: formik.values.sellerName,
          email: formik.values.email,
          password: formik.values.password,
          mobile: formik.values.mobile,
          GSTIN: formik.values.GSTIN,

          pickupAddress: {
            name: formik.values.pickupAddress.name,
            address: formik.values.pickupAddress.address,
            city: formik.values.pickupAddress.city,
            state: formik.values.pickupAddress.state,
            pincode: Number(formik.values.pickupAddress.pincode),
            locality: formik.values.pickupAddress.locality,
            mobile: formik.values.mobile,
          },

          bankDetails: {
            accountHolderName: formik.values.bankDetails.accountHolderName,
            accountNumber: formik.values.bankDetails.accountNumber,
            ifscCode: formik.values.bankDetails.ifscCode,
            bankName: formik.values.bankDetails.bankName,
          },

          businessDetails: {
            businessName: formik.values.businessDetails.businessName,
            businessEmail: formik.values.businessDetails.businessEmail,
            businessMobile: formik.values.businessDetails.businessMobile,
            businessAddress: formik.values.businessDetails.businessAddress,
          },

          profileImage: "",
        } as any),
      );

      if (sendSignUpOtp.fulfilled.match(result)) {
        setOpenSnackbar(true);
        navigate(
          `/auth/seller/verify/${formik.values.businessDetails.businessEmail}`,
        );
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
        <SellerStep1 formik={formik} />
      ) : activeStep === 1 ? (
        <SellerStep2 formik={formik} />
      ) : activeStep === 2 ? (
        <SellerStep3 formik={formik} />
      ) : (
        <SellerStep4 formik={formik} />
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

export default SellerForm;
