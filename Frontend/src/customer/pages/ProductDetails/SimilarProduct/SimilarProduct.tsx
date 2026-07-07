import ProductCard from "../../productPage/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/store";
import { useEffect } from "react";
import { getSimilarProducts } from "../../../../ReduxToolkit/Features/User/ProductSlice";

interface SimilarProductProps {
  productId: string;
}

const SimilarProduct = ({ productId }: SimilarProductProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSimilarProducts(productId));
  }, [dispatch, productId]);
  const { similarProducts, similarLoading } = useAppSelector(
    (state) => state.products,
  );

  console.log("simiar products");
  console.log("simialar product", similarProducts);

  if (similarLoading) {
    return <div className="py-8 text-center">Loading similar products...</div>;
  }

  if (similarProducts.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No similar products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
      {similarProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProduct;
