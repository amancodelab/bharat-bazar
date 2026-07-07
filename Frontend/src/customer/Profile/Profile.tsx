import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menus = [
    { name: "Orders", path: "/account/orders" },

    { name: "Saved Carts", path: "/account/cart" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/account/logout" },
  ];

  const acitveClass = "bg-teal-600 text-white border-2 ";

  const handleClick = (menu: any) => {
    navigate(menu.path);
  };
  return (
    <div className="hidden md:flex md:w-80 p-4 flex-col justify-between transition-all duration-200 ease-in-out  ">
      <div className="col-span-1 md:col-span-3 px-2 md:px-5 lg:px-10">
        <div className="space-y-2">
          {menus.map((menu) => (
            <div
              key={menu.name}
              onClick={() => handleClick(menu)}
              className={`flex items-start whitespace-nowrap rounded-r-2xl py-3 px-4 cursor-pointer max-w-60

                ${location.pathname === menu.path ? acitveClass : "bg-white"}`}
            >
              <span
                className={
                  location.pathname === menu.path
                    ? "text-white"
                    : "text-teal-600"
                }
              ></span>

              <h1>{menu.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
