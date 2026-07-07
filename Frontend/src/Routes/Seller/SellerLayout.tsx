import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "@mui/material";
import SellerNavbar from "../../seller/SellerDashBorad.tsx/SellerNavbar";
import SliderDrawerList from "../../seller/SellerDashBorad.tsx/SliderDrawerList";

const SellerLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <SellerNavbar setOpenDrawer={setOpenDrawer} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-gray-200 bg-white">
          <SliderDrawerList toggleDrawer={true} />
        </aside>

        {/* Mobile Drawer */}
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <SliderDrawerList toggleDrawer={true} />
        </Drawer>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
