import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import Loading from "../../util/Loading";
import ItemCard from "./ItemCard";
import PriceCard from "./PriceCard";
import { fetchCart } from "../../ReduxToolkit/Features/User/cartSlice";
import ErrorAlert from "../../util/ErrorAlert";

const FullCard = () => {
  const jwt = localStorage.getItem("jwt");

  const dispatch = useAppDispatch();

  const { cart, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchCart({ jwt }));
    }
  }, [dispatch, jwt]);

  if (!jwt) {
    return <ErrorAlert error="Please login first." />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!cart?.cartItems?.length) {
    return (
      <div className="flex justify-center items-center h-96">
        <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-10 mt-5 w-full">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4">
        {/* Item Cards */}
        <div className="w-full lg:w-[65%] space-y-4">
          {cart?.cartItems.map((item: any) => (
            <ItemCard key={item._id} cartItem={item} />
          ))}
        </div>

        {/* Price Card */}
        <div className="w-full lg:w-[30%]">
          <PriceCard />
        </div>
      </div>
    </div>
  );
};

export default FullCard;
