import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import HeroSectionTable from "./HeroSectionTable";
import CreateHeroSection from "./CreateHeroSection";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../ReduxToolkit/store";

const HeroSection = () => {
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
        <h1 className="text-3xl font-bold">Hero Sections</h1>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Back to List" : "Add Hero Section"}
        </Button>
      </div>

      {showForm ? <CreateHeroSection /> : <HeroSectionTable />}
    </div>
  );
};

export default HeroSection;
