import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../ReduxToolkit/Features/User/ProductSlice";
import { useAppDispatch } from "../../../ReduxToolkit/store";
import { addCart } from "../../../ReduxToolkit/Features/User/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isHover && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
      }, 1200);
    }

    return () => clearInterval(interval);
  }, [isHover, product.images.length]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const jwt = localStorage.getItem("jwt");

    dispatch(
      addCart({
        jwt,
        productId: product._id,
        quantity: 1,
        size: product.size,
      }),
    );
  };

  return (
    <div
      onClick={() => navigate(`/product-details/${product._id}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setCurrentImage(0);
      }}
      className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
    >
      <div className="h-52 md:h-64 overflow-hidden">
        <img
          src={product.images[currentImage]}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-2 min-h-19">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-teal-600">
            ₹{product.sellingPrice}
          </span>

          <span className="line-through text-gray-500">₹{product.mrp}</span>
        </div>

        <div className="mt-2">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
            {product.discountPercent}% OFF
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-5 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
