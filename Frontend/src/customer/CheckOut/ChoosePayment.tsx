import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { createOrder } from "../../ReduxToolkit/Features/User/orderSlice";
import { PaymentMethod } from "../Data/PaymentMethod";

interface ChoosePaymentProps {
  addressId: string;
}
type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];

const ChoosePayment = ({ addressId }: ChoosePaymentProps) => {
  const dispatch = useAppDispatch();

  const jwt = localStorage.getItem("jwt");

  const cart = useAppSelector((state) => state.cart.cart);

  const [paymentGateway, setPaymentGateway] = useState<PaymentMethodType>(
    PaymentMethod.RAZORPAY,
  );

  const handlePayment = async () => {
    if (!jwt) {
      alert("Please login first");
      return;
    }

    if (!addressId) {
      alert("Please select a shipping address");
      return;
    }

    const result = await dispatch(
      createOrder({
        shippingAddress: addressId,
        paymentGateway,
        jwt,
      }),
    );

    if (createOrder.fulfilled.match(result)) {
      const paymentLinkUrl = result.payload.data?.paymentLinkUrl;

      if (paymentLinkUrl) {
        window.location.href = paymentLinkUrl;
      }
    } else {
      alert("Failed to create order");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="border-2 border-gray-300 rounded-lg px-4 py-5">
        <h1 className="text-center text-lg font-semibold text-teal-600">
          Choose Payment Gateway
        </h1>

        <FormControl sx={{ mt: 2 }}>
          <RadioGroup
            value={paymentGateway}
            onChange={(e) =>
              setPaymentGateway(e.target.value as PaymentMethodType)
            }
          >
            <FormControlLabel
              value={PaymentMethod.RAZORPAY}
              control={<Radio />}
              label="Razorpay"
            />

            <FormControlLabel
              value={PaymentMethod.CASHFREE}
              control={<Radio />}
              label="CashFree"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <section className="border-2 border-gray-200 rounded-xl px-5 py-4 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{cart?.totalMrp ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>₹{cart?.totalDiscount ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <Divider />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{cart?.totalSellingPrice ?? 0}</span>
        </div>

        <Button
          fullWidth
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </section>
    </div>
  );
};

export default ChoosePayment;
