import { Button } from "@mui/material";
import { useState } from "react";
import ElectronicsTable from "./ElectronicsTable";
import CreateElectronic from "./CreateElectronic";

const ElectronicsCategory = () => {
  const [activeTab, setActiveTab] = useState("electronics");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Electronics</h1>

        <div className="flex gap-3">
          <Button
            variant={activeTab === "electronics" ? "contained" : "outlined"}
            onClick={() => setActiveTab("electronics")}
          >
            Electronics
          </Button>

          <Button
            variant={activeTab === "create" ? "contained" : "outlined"}
            onClick={() => setActiveTab("create")}
          >
            Add Electronic
          </Button>
        </div>
      </div>

      {/* Body */}
      {activeTab === "electronics" ? (
        <ElectronicsTable />
      ) : (
        <CreateElectronic />
      )}
    </div>
  );
};

export default ElectronicsCategory;
