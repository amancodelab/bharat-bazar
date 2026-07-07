import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import OrderTable from "../Order/OrderTable";
import { fetchSellerOrder } from "../../ReduxToolkit/Features/Seller/sellerOrderSlice";
import Loading from "../../util/Loading";

const SellerOrder = () => {
  const jwt = localStorage.getItem("seller_jwt");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSellerOrder(jwt));
  }, [dispatch, jwt]);

  const { orders, loading } = useAppSelector((state) => state.sellerOrder);
  if (loading) {
    return <Loading />;
  }

  console.log("Orders", orders);

  if (orders.length === 0) {
    <div className="w-full h-96 flex justify-center items-center ">
      <h1 className="text-2xl text-center">No orders founds</h1>
    </div>;
  }

  return (
    <div className="p-5 space-4 flex flex-col items-center justify-start">
      <h1 className="logo text-lg">All Orders</h1>
      <OrderTable orders={orders} />
    </div>
  );
};

export default SellerOrder;
