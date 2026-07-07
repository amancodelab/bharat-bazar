import { useEffect } from "react";
import ProductTable from "../Products/ProductTable";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { fetchSellerProducts } from "../../ReduxToolkit/Features/Seller/sellerProductSlice";

const SellerProduct = () => {
  const sellerJwt = localStorage.getItem("seller_jwt");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerProducts(sellerJwt));
  }, [dispatch, sellerJwt]);

  return (
    <div>
      <div className="p-5 space-4 flex flex-col items-center justify-start">
        <h1 className="logo text-lg">Prdoucts</h1>
        <ProductTable />
      </div>
    </div>
  );
};

export default SellerProduct;
