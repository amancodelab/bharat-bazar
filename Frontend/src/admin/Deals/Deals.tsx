import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDeals from "./CreateDeals";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../ReduxToolkit/store";

export const tabs = ["Deals", "Categories", "Create Deal"];

const Deals = () => {
  const [activeTab, setActiveTab] = useState("Deals");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("admin_jwt");
  useEffect(() => {
    if (!jwt) {
      navigate("/admin/login");
    }
  }, [dispatch, jwt]);

  return (
    <div className="p-5">
      <div className="flex gap-4 mb-5">
        {tabs.map((tab) => (
          <Button
            key={tab}
            sx={{ fontSize: 12 }}
            variant={tab === activeTab ? "contained" : "outlined"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {activeTab === "Deals" ? (
        <DealTable />
      ) : activeTab === "Categories" ? (
        <DealCategoryTable />
      ) : (
        <CreateDeals />
      )}
    </div>
  );
};

export default Deals;
