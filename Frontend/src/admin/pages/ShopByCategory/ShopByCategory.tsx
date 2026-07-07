import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ShopCategoryTable from "./ShopByCategoryTable";
import CreateShopCategory from "./CreateShopCategory";
import { useAppDispatch } from "../../../ReduxToolkit/store";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const [showForm, setShowForm] = useState(false);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Shop By Categories</h1>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Back to List" : "Add Category"}
        </Button>
      </div>

      {showForm ? <CreateShopCategory /> : <ShopCategoryTable />}
    </div>
  );
};

export default ShopByCategory;
