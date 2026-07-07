import {
  LocalShipping,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { fetchProductById } from "../../../ReduxToolkit/Features/User/ProductSlice";
import type { Product } from "../../../ReduxToolkit/Features/User/ProductSlice";
import { addCart } from "../../../ReduxToolkit/Features/User/cartSlice";

// const product = {
//   id: "1",
//   name: "Wireless Headphones",
//   price: "₹1999",
//   discount: "20%",
//   images: [
//     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop",
//   ],
// };

interface ProductDetails {
  product: Product;
}
const ProductDetails = () => {
  const { productId } = useParams();

  const dispatch = useAppDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const [value, setValue] = useState(1);
  const handleChange = (index: number) => setImageIndex(index);
  useEffect(() => {
    dispatch(fetchProductById(String(productId)));
  }, [dispatch, productId]);
  const { product, loading } = useAppSelector((state) => state.products);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-2xl text-center">Loading.....</h1>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Product not found</h1>
      </div>
    );
  }

  const brandname = product?.title;

  const handleQuanityIncrease = () => {
    setValue((prev) => prev + 1);
  };
  const handleQuanityDecrease = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const jwt = localStorage.getItem("jwt");
  const handleAddtoCart = () => {
    const request = {
      jwt: jwt,
      productId: productId,
      quantity: value,
      size: product.size,
    };
    dispatch(addCart(request));
  };
  console.log("Product", product);

  return (
    <div className="min-h-screen px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex">
          <div className="hidden lg:flex lg:flex-col justify-around cursor-pointer gap-2 w-[30%]">
            {product?.images.map((image, index) => (
              <img
                key={index}
                onClick={() => handleChange(index)}
                className="h-28 w-[95%] border-none rounded-2xl object-cover hover:scale-95 transition-all duration-300"
                src={image}
              ></img>
            ))}
          </div>
          <div className="w-full px-2 lg:px-1 border-none rounded-2xl ">
            <img
              className="shadow-md w-full lg:w-[95%] lg:min-h-108 lg:max-h-120 h-96 overflow-hidden rounded-2xl border-none bg-white hover:-translate-y-1 hover:shadow-xl duration-300 transition-all"
              src={product?.images[imageIndex]}
            ></img>
          </div>
        </div>
        <div className="w-full rounded-xl">
          <div>
            <p className="font-semibold text-[20px] px-4 py-1 ">{brandname}</p>
            <p className="text-sm font-medium px-4 text-gray-600 py-1">
              {product?.title}
            </p>
          </div>
          <div className=" lg:w-50 w-38  border-2 border-gray-700 text-gray-700 flex justify-around items-center py-2 my-4 text-sm">
            <div className="flex justify-center items-center">
              <span>4</span>
              <Star color="primary"></Star>
            </div>
            <Divider
              className="h-4"
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 1,
                borderColor: "gray",
              }}
            />
            <p>432 rating</p>
          </div>

          {/* now making the price and message */}
          <div className="flex flex-col p-2">
            <div className="flex  text-[20px] font-semibold items-center">
              <p>{product?.sellingPrice}</p>
              <p className="px-4 text-gray-600">MRP</p>
              <p className="bg-green-400 px-4 py-1 rounded-4xl">
                {product?.discountPercent} off
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700 ">
                Inlusive of all taxes.Free Shippinig above ₹500
              </p>
            </div>
          </div>
          {/* this is for message  */}
          <div>
            <h1 className="flex gap-2 lg:gap-2 my-2 lg:my-4">
              <Shield color="primary" />
              <p className="text-lg font-meduim">Authentic & Quality</p>
            </h1>
            <h1 className="flex gap-2 lg:gap-4 my-2 lg:my-4">
              <WorkspacePremium color="primary" />
              <p className="text-lg font-meduim">100 % money back guarantee </p>
            </h1>
            <h1 className="flex gap-2 lg:gap-4 my-2 lg:my-4">
              <LocalShipping color="primary" />
              <p className="text-lg font-meduim">Free Shipping & Returns </p>
            </h1>
            <h1 className="flex gap-2 lg:gap-4 my-2 lg:my-4">
              <Wallet color="primary" />
              <p className="text-lg font-meduim">
                Pay on Delivery might be available
              </p>
            </h1>
          </div>

          {/* this is quanty button */}
          <h1 className="text-lg lg:text-2xl text-gray-600 p-2 pl-0 ">
            Quanity:
          </h1>
          <div className="flex gap-x-2 lg:gap-x-4 items-center">
            <button
              onClick={handleQuanityDecrease}
              className="px-1 w-12 h-8 lg:h-10 lg:w-16 py-0 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors duration-200 text-2xl border"
            >
              -
            </button>

            <h1 className="text-2xl">{value}</h1>

            <button
              onClick={handleQuanityIncrease}
              className="px-1 w-12 h-8 lg:h-10 lg:w-16 py-0 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors duration-200 border text-2xl"
            >
              +
            </button>
          </div>
          {/* Now it time for button  */}

          <div className="flex gap-3 lg:gap-6 items-center mb-2">
            <button
              className="bg-teal-500 hover:bg-teal-600  shadow-sm p-2 font-semibold lg:text-xl
             text-white border-none rounded-2xl lg:w-[25%] cursor-pointer hover:shadow-xl w-[30%] mt-2 duration-300 transition-all"
              onClick={() => handleAddtoCart()}
            >
              Add to Cart
            </button>

            <button
              className=" bg-white hover:bg-gray-200 shadow-sm p-2 font-semibold lg:text-xl
              border rounded-2xl lg:w-[25%] cursor-pointer hover:shadow-xl w-[40%] text-black mt-2 duration-300 transition-all border-teal-300"
            >
              Add to Whitelist
            </button>
          </div>
          <div className="mt-2 lg:mt-4">
            <p className="text-sm text-gray-600">{product?.description}</p>
          </div>
        </div>
      </div>
      {/* similar product */}
      <section className="px-5 lg:px-20 mt-10 lg:mt-20">
        <div>
          <h1 className="text-3xl lg:text-5xl text-center">Similar Products</h1>
          <SimilarProduct productId={product._id} />
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
