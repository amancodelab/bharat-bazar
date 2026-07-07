import { ShoppingBag, LocationOn, Logout } from "@mui/icons-material";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  GetuserData,
  GetUserProfile,
} from "../../ReduxToolkit/Features/User/GetUserData";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  closeDrawer?: () => void;
}

const menus = [
  {
    name: "Orders",
    path: "/account/orders",
    icon: <ShoppingBag />,
  },
  {
    name: "Saved Cards",
    path: "/account/cart",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Addresses",
    path: "/account/addresses",
    icon: <LocationOn />,
  },
  {
    name: "Logout",
    path: "/account/logout",
    icon: <Logout />,
  },
];

const ProfileSidebar = ({ closeDrawer }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetUserProfile());
    dispatch(GetuserData());
  }, [dispatch]);

  const user = useAppSelector((state) => state.userData.userdata);

  const profile = useAppSelector((state) => state.userData.profile);

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-center text-2xl text-red-500">
          Failed to Verified User
        </h1>
      </div>
    );
  }

  return (
    <div className="w-72 h-full bg-white p-4">
      {/* User Info */}
      <div className="flex flex-col items-center border-b pb-4 mb-4">
        <img
          src={profile}
          alt="Profile Image"
          className="w-20 h-20 rounded-full object-cover"
        />

        <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>

        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            onClick={() => closeDrawer?.()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {menu.icon}
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
