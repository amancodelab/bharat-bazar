import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Divider } from "@mui/material";
import { useAppSelector } from "../../ReduxToolkit/store";
import { useNavigate } from "react-router-dom";

const PriceCard = () => {
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);
  const ShippingPrice = 50; // update the make dynamic
  const handleBuyNow = async () => {
    navigate("/checkout");
  };
  return (
    <div className="min-w-[75%] md:min-w-[50%] lg:min-w-[35%] m-2">
      <div className="flex flex-col  gap-2 px-5">
        {/* apply coupon */}
        <section className="flex flex-col border-2 border-gray-200 rounded-xl px-5 lg:py-2 md:py-2 py-1 ">
          <div className="flex gap-x-2 items-center">
            <LocalOfferIcon color="primary" />
            <h1>Apply Coupans</h1>
          </div>
          <div className="flex items-center gap-2 my-2">
            <input
              placeholder="Coupon Code"
              className="flex-1 p-2 rounded-md border border-gray-300 min-w-20"
            />
            <Button size="small">Apply</Button>
          </div>
        </section>

        {/* shoppin price breakdown */}

        <section className="flex flex-col border-2 border-gray-200 rounded-xl px-5 py-2 text-sm text-gray-600 lg:gap-y-2 md:gap-2 gap-1">
          <div className="flex justify-between items-center">
            <h1>Subtotal</h1>
            <h1>{cart.totalSellingPrice}</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>Discount</h1>
            <h1>{cart.totalDiscount}</h1>
          </div>

          <div className="flex justify-between items-center">
            <h1>Shipping</h1>
            <h1>{ShippingPrice}</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>Platform Fee</h1>
            <h1>Free</h1>
          </div>
          <Divider className="w-full py-1" />
          <div className="flex justify-between items-center text-black font-medium py-2">
            <h1>Total</h1>
            <h1>{cart.totalSellingPrice + ShippingPrice}</h1>
          </div>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => handleBuyNow()}
          >
            Buy Now
          </Button>
        </section>

        <section className="flex justify-between px-5 py-2 items-center text-gray-600 font-medium text-sm border-2 border-gray-200 rounded-xl">
          <Button sx={{ textTransform: "none" }}>Add from WhishList</Button>
          <FavoriteIcon className="text-red-600" />
        </section>
      </div>
    </div>
  );
};

export default PriceCard;
