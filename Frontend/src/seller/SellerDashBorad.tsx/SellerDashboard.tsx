import { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  AttachMoney,
  ShoppingCart,
  Receipt,
  Cancel,
  Paid,
  CurrencyRupee,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { getSellerReport } from "../../ReduxToolkit/Features/Seller/sellerReportSlice";
import Loading from "../../util/Loading";
import ErrorAlert from "../../util/ErrorAlert";

const SellerDashboard = () => {
  const dispatch = useAppDispatch();

  const { report, loading, error } = useAppSelector(
    (state) => state.sellerReport,
  );

  useEffect(() => {
    dispatch(getSellerReport());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cards = [
    {
      title: "Total Earnings",
      value: `₹${report?.totalEarning?.toLocaleString() || 0}`,
      icon: <AttachMoney sx={{ fontSize: 40, color: "#16a34a" }} />,
    },
    {
      title: "Total Sales",
      value: `₹${report?.totalSales?.toLocaleString() || 0}`,
      icon: <CurrencyRupee sx={{ fontSize: 40, color: "#2563eb" }} />,
    },
    {
      title: "Total Orders",
      value: report?.totalOrders || 0,
      icon: <ShoppingCart sx={{ fontSize: 40, color: "#9333ea" }} />,
    },
    {
      title: "Transactions",
      value: report?.totalTransaction || 0,
      icon: <Paid sx={{ fontSize: 40, color: "#ea580c" }} />,
    },
    {
      title: "Cancelled Orders",
      value: report?.cancelOrders || 0,
      icon: <Cancel sx={{ fontSize: 40, color: "#dc2626" }} />,
    },
    {
      title: "Total Tax",
      value: `₹${report?.totalTax?.toLocaleString() || 0}`,
      icon: <Receipt sx={{ fontSize: 40, color: "#0891b2" }} />,
    },
  ];

  return (
    <div className="w-full px-5 py-6">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="shadow-lg rounded-xl hover:shadow-xl transition-all"
          >
            <CardContent className="flex justify-between items-center">
              <div>
                <Typography variant="subtitle1" color="text.secondary">
                  {card.title}
                </Typography>

                <Typography variant="h4" className="font-bold mt-2">
                  {card.value}
                </Typography>
              </div>

              {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
