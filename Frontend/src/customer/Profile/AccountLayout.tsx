import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const AccountLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="hidden md:block border-r border-gray-300 pr-4">
          <Profile />
        </div>

        {/* Content */}
        <div className="pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
