import { Button, Card, Divider } from "@mui/material";
import TransationTable from "../Transition/TransactionTable";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { useEffect } from "react";
import { getSellerTransactions } from "../../ReduxToolkit/Features/Seller/sellerTransactionSlice";
import Loading from "../../util/Loading";
import ErrorAlert from "../../util/ErrorAlert";

const SellerPayment = () => {
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
  const totalEarning = transactions.reduce(
    (sum: number, transaction: any) =>
      sum + transaction.order.totalSellingPrice,
    0,
  );

  const lastPayment =
    transactions.length > 0
      ? transactions[transactions.length - 1].order.totalSellingPrice
      : 0;
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="py-2">
        {error ? (
          <ErrorAlert error={error || "Failed to get seller Transaction"} />
        ) : null}
        <Card>
          <p className="px-4 py-2 lg:py-4 font-medium">Total Earning</p>

          <strong className="px-4 py-2 lg:py-4 text-2xl text-green-600">
            ₹{totalEarning.toLocaleString()}
          </strong>

          <Divider className="min-w-40 md:min-w-60 lg:min-w-80" />

          <div className="px-4 py-2 lg:py-4 flex items-center justify-between">
            <p>Last Payment:</p>

            <strong className="text-blue-600">
              ₹{lastPayment.toLocaleString()}
            </strong>
          </div>
        </Card>
      </div>
      <div className="mt-5 ">
        <Button variant="contained" color="primary">
          Transation
        </Button>
        <TransationTable transactions={transactions} />
      </div>
    </div>
  );
};

export default SellerPayment;
