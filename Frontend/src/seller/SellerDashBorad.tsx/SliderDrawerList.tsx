import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddIcon from "@mui/icons-material/Add";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { useLocation, useNavigate } from "react-router-dom";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface props {
  toggleDrawer: boolean;
}

const SliderDrawerList = ({}: props) => {
  const menus = [
    {
      iconName: "Dashboard",
      icon: <DashboardIcon />,
      path: "/seller/dashboard",
    },
    {
      iconName: "Orders",
      icon: <ShoppingBagIcon />,
      path: "/seller/orders",
    },
    {
      iconName: "Products",
      icon: <Inventory2Icon />,
      path: "/seller/products",
    },
    {
      iconName: "Add Product",
      icon: <AddIcon />,
      path: "/seller/add-product",
    },
    {
      iconName: "Payments",
      icon: <PaymentIcon />,
      path: "/seller/payments",
    },
    {
      iconName: "Transactions",
      icon: <ReceiptLongIcon />,
      path: "/seller/transactions",
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

  const menu2 = [
    {
      iconName: "Logout",
      icon: <Logout />,
      path: "/seller/logout",
    },
    {
      iconName: "Account",
      icon: <AccountBoxIcon />,
      path: "/seller/account",
    },
  ];
  return (
    <div className="h-full w-[60vw] md:w-80 p-4 flex flex-col justify-between transition-all duration-200 ease-in-out ">
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
        <Divider className="mb-4" />

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
  );
};

export default SliderDrawerList;
