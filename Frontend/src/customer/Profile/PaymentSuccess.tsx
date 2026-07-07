import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";

import { useAppDispatch } from "../../ReduxToolkit/store";
import { paymentSuccess } from "../../ReduxToolkit/Features/User/orderSlice";

const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { paymentOrderId } = useParams();

  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        setMessage("Please login first.");
        return;
      }

      const paymentId = searchParams.get("razorpay_payment_id");
      const paymentLinkId = searchParams.get("razorpay_payment_link_id");

      if (!paymentId || !paymentLinkId) {
        setMessage("Payment information not found.");
        return;
      }

      try {
        const result = await dispatch(
          paymentSuccess({
            paymentId,
            paymentLinkId,
            paymentOrderId,
            jwt,
          }),
        );

        if (paymentSuccess.fulfilled.match(result)) {
          setMessage("Payment Successful!");

          setTimeout(() => {
            navigate("/account/orders");
          }, 2000);
        } else {
          setMessage("Payment verification failed.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong.");
      }
    };

    verifyPayment();
  }, [dispatch, navigate, paymentOrderId, searchParams]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <CircularProgress />
      <Typography variant="h5">{message}</Typography>
    </div>
  );
};

export default PaymentSuccess;
