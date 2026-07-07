import { Outlet } from "react-router-dom";
import Navabar from "./Navabar";
import AdminSlider from "./AdminSlider";
import { Divider } from "@mui/material";

const AdminOutlet = () => {
  return (
    <div>
      <Navabar />

      <div className="flex">
        <div className="flex">
          <div className="hidden md:block">
            <AdminSlider />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <main className="flex-1 min-w-0  p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminOutlet;
