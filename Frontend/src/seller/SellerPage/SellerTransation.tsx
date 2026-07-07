import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import TransationTable from "../Transition/TransactionTable";
import { getSellerTransactions } from "../../ReduxToolkit/Features/Seller/sellerTransactionSlice";
import Loading from "../../util/Loading";
import ErrorAlert from "../../util/ErrorAlert";

const SellerTransaction = () => {
  const sellerId = localStorage.getItem("sellerId");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSellerTransactions(String(sellerId)));
  }, [dispatch, sellerId]);

  const { transactions, loading, error } = useAppSelector(
    (state) => state.sellerTransaction,
  );

  if (loading) {
    return <Loading />;
  }

  console.log("seller transactions", transactions);

  return (
    <div>
      <div className="p-5 space-4 flex flex-col items-center justify-start">
        {error ? (
          <ErrorAlert error={error || "Failed to get seller Transaction"} />
        ) : null}
        <h1 className="logo text-lg md:text-2xl">Transation Table</h1>
        <TransationTable transactions={transactions} />
      </div>
    </div>
  );
};

export default SellerTransaction;
