import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import {
  fetchOrdersHistory,
  cancelOrder,
} from "../../ReduxToolkit/Features/User/orderSlice";
import OrderCard from "./OrderCard";

const Order = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");

  const { orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (jwt && userId) {
      dispatch(fetchOrdersHistory({ jwt, userId }));
    }
  }, [dispatch, jwt, userId]);

  if (!jwt || !userId) {
    return (
      <div className="flex justify-center items-center h-96">
        <h1>Please Login First</h1>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (!orders.length) {
    return <div className="flex justify-center py-20">No Orders Found</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      {orders.map((order: any) => (
        <div key={order._id} className="border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBagIcon color="primary" />

            <div>
              <h2 className="font-semibold">{order.orderStatus}</h2>

              <p className="text-sm text-gray-500">
                Delivery : {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {orders.map((order: any) => (
              <OrderCard
                key={order._id}
                order={order}
                onView={() => navigate(`/order/${order._id}`)}
                onCancel={() =>
                  dispatch(
                    cancelOrder({
                      jwt,
                      orderId: order._id,
                    }),
                  )
                }
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p>Total : ₹{order.totalSellingPrice}</p>

              <p>Payment : {order.paymentStatus}</p>
            </div>

            <div className="flex">
              <IconButton onClick={() => navigate(`/order/${order._id}`)}>
                <EditIcon color="primary" />
              </IconButton>

              <IconButton
                onClick={() =>
                  dispatch(
                    cancelOrder({
                      jwt,
                      orderId: order._id,
                    }),
                  )
                }
              >
                <CancelIcon color="error" />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
