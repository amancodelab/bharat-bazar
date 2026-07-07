import { Button } from "@mui/material";
import {
  deletedCartItem,
  updatedCartItem,
} from "../../ReduxToolkit/Features/User/cartSlice";
import { useAppDispatch } from "../../ReduxToolkit/store";

interface ItemCardProps {
  cartItem: any;
}

const ItemCard = ({ cartItem }: ItemCardProps) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleIncrease = () => {
    if (!jwt) return;

    dispatch(
      updatedCartItem({
        jwt,
        cartItemId: cartItem._id,
        updateData: {
          quantity: cartItem.quantity + 1,
        },
      }),
    );
  };

  const handleDecrase = () => {
    if (!jwt) return;

    if (cartItem.quantity <= 1) return;

    dispatch(
      updatedCartItem({
        jwt,
        cartItemId: cartItem._id,
        updateData: {
          quantity: cartItem.quantity - 1,
        },
      }),
    );
  };

  const handleDelete = () => {
    if (!jwt) return;

    dispatch(
      deletedCartItem({
        jwt,
        cartItemId: cartItem._id,
      }),
    );
  };

  return (
    <div className="w-full lg:w-[95%] h-60 ">
      <div
        className="flex flex-col justify-center
    border-2 border-gray-200
    rounded-md
    p-3 lg:px-4
    w-full h-full hover:border-gray-400 transition-all duration-100 ease-in-out"
      >
        <div className="flex justify-center items-start align-top py-1">
          {/* Image + Details */}
          <div className="flex items-start w-full gap-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
              <img
                className="w-full h-full object-cover"
                src={cartItem.product.images[0]}
                alt={cartItem.product.title}
              />
            </div>

            <div className="flex flex-col justify-center flex-1 px-3 text-[12px] md:text-sm text-gray-800 ">
              <h1 className="md:text-lg text-sm font-semibold">
                {cartItem.product.title}
              </h1>

              <h1 className="text-[16px] text-gray-700">
                Quantity: {cartItem.quantity}
              </h1>

              <h1>₹{cartItem.sellingPrice}</h1>

              <h1>7 days Replacement: Available</h1>
            </div>
            <div className="flex items-start h-full">
              <Button
                onClick={handleDelete}
                color="error"
                size="small"
                className="ml-auto"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div
          className="mt-3 h-[18%]
      flex items-center justify-between
      border-2 border-gray-200
      rounded-md"
        >
          <div className="flex items-center justify-center ">
            <Button onClick={handleDecrase} size="small">
              <p className="text-3xl">-</p>
            </Button>

            <h1>{cartItem.quantity}</h1>

            <Button onClick={handleIncrease} size="small">
              <p className="text-lg">+</p>
            </Button>
          </div>

          <div>
            <h1 className="flex px-2 ">
              Total Price:{cartItem.quantity * cartItem.product.sellingPrice}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
