import { useEffect } from "react";
import { Button, Divider } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useParams } from "react-router-dom";

import OrderStepper from "./OrderStepper";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import {
  fetchOrderById,
  cancelOrder,
} from "../../ReduxToolkit/Features/User/orderSlice";

const OrderDetails = () => {
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");

  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.orders.currentOrder);

  useEffect(() => {
    if (jwt && orderId) {
      dispatch(fetchOrderById({ jwt, orderId })).then((res) => {
        console.log("Fetch order response:", res);
      });
    }
  }, [dispatch, jwt, orderId]);
  if (!order) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <img
        src={order.orderItems[0]?.product.images[0]}
        className="w-40 mx-auto"
      />

      <h2 className="text-center text-xl font-semibold">
        {order.orderItems[0]?.product.title}
      </h2>

      <OrderStepper
        orderStatus={order.orderStatus}
        paymentStatus={order.paymentStatus}
        orderDate={order.orderDate}
        deliveryDate={order.deliveryDate}
      />

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold">Delivery Address</h2>

        <p>{order.shippingAddress.name}</p>

        <p>{order.shippingAddress.mobile}</p>

        <p>
          {order.shippingAddress.address}, {order.shippingAddress.district},{" "}
          {order.shippingAddress.state}, {order.shippingAddress.pincode}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold">Payment Details</h2>

        <Divider sx={{ my: 2 }} />

        <p>Payment Status : {order.paymentStatus}</p>

        <p>Total : ₹{order.totalSellingPrice}</p>

        <Button startIcon={<PaymentIcon />}>{order.paymentStatus}</Button>
      </div>

      <p>
        <strong>Seller :</strong> {order.seller.sellerName}
      </p>

      <Button
        fullWidth
        color="error"
        variant="outlined"
        onClick={() =>
          dispatch(
            cancelOrder({
              jwt,
              orderId: order._id,
            }),
          )
        }
      >
        Cancel Order
      </Button>
    </div>
  );
};

export default OrderDetails;
