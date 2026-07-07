import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiscountIcon from "@mui/icons-material/Discount";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CategoryIcon from "@mui/icons-material/Category";

import { Logout } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AddIcon from "@mui/icons-material/Add";
import { Divider, ListItemIcon } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";

const AdminSlider = () => {
  const menus = [
    {
      iconName: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      iconName: "Coupon",
      icon: <LocalOfferIcon />,
      path: "/admin/coupon",
    },
    {
      iconName: "Home",
      icon: <HomeIcon />,
      path: "/admin",
    },
    {
      iconName: "Add Coupon",
      icon: <AddIcon />,
      path: "/admin/add-coupon",
    },
    {
      iconName: "Electric Category",
      icon: <ElectricBoltIcon />,
      path: "/admin/electric-category",
    },
    {
      iconName: "Shop By Category",
      icon: <CategoryIcon />,
      path: "/admin/shop-category",
    },

    {
      iconName: "Deals",
      icon: <DiscountIcon />,
      path: "/admin/deals",
    },
    {
      iconName: "Grid",
      icon: <GridViewIcon />,
      path: "/admin/grid",
    },
    {
      iconName: "HeroSection",
      icon: <CropLandscapeIcon />,
      path: "/admin/hero-section",
    },
  ];

  const menu2 = [
    {
      iconName: "Logout",
      icon: <Logout />,
      path: "/admin/logout",
    },
    {
      iconName: "Account",
      icon: <AccountCircleIcon />,
      path: "/admin/account",
    },
  ];

  const acitveClass = "bg-teal-600 text-white border-2 ";
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (menu: any) => {
    navigate(menu.path);
    if (menu.iconName === "Logout") {
      console.log("Logout");
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-80px)] w-[60vw] md:w-80 p-4 md:px-10 flex flex-col justify-between transition-all duration-200 ease-in-out  ">
        {/* Top Menus */}
        <div className="space-y-2">
          {menus.map((menu) => (
            <div
              key={menu.iconName}
              onClick={() => handleClick(menu)}
              className={`flex items-center rounded-r-2xl py-3 px-4 cursor-pointer
          ${location.pathname === menu.path ? acitveClass : "bg-white"}`}
            >
              <ListItemIcon>
                <span
                  className={
                    location.pathname === menu.path
                      ? "text-white"
                      : "text-teal-600"
                  }
                >
                  {menu.icon}
                </span>
              </ListItemIcon>

              <h1>{menu.iconName}</h1>
            </div>
          ))}
        </div>

        {/* Bottom Menus */}
        <div>
          <Divider className="mt-auto mb-4" />

          {menu2.map((menu) => (
            <div
              key={menu.iconName}
              onClick={() => handleClick(menu)}
              className={`flex items-center rounded-r-2xl py-3 px-4 cursor-pointer
          ${location.pathname === menu.path ? acitveClass : "bg-white"}`}
            >
              <ListItemIcon>
                <span
                  className={
                    location.pathname === menu.path
                      ? "text-white"
                      : "text-teal-600"
                  }
                >
                  {menu.icon}
                </span>
              </ListItemIcon>

              <h1>{menu.iconName}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSlider;
