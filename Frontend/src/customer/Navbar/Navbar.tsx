import { useState } from "react";
import { Avatar, Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../Data/mainCategory";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useAppSelector } from "../../ReduxToolkit/store";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileSidebar from "../Profile/ProfileSidebar";

const Navbar = () => {
  // handle serch in navbar
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  const [activeCategory, setActiveCategory] = useState<any>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isuserAuth = useAppSelector((state) => {
    return state.userAuth.isAuthenticated;
  });
  const isSellerAuth = useAppSelector(
    (state) => state.auth.isSellerAuthenticated,
  );

  const userName = useAppSelector((state) => state.userData.userdata?.name);

  const profileImage = useAppSelector((state) => {
    return state.userData?.profile;
  });
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  const { mainCategories } = useAppSelector((state) => state.mainCategory);
  const categories = mainCategories.length > 0 ? mainCategories : mainCategory;

  const sellerProfile = useAppSelector((state) => state.seller.profile);
  const currentSeller = useAppSelector((state) => state.seller.currentSeller);

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-gray-300 bg-white mb-2">
        <div
          className="
      grid items-center h-20 px-3 lg:px-8
      grid-cols-[1fr_auto]
      md:grid-cols-[220px_1fr_auto]
    "
        >
          {/* Column 1: Brand */}
          <div className="flex items-center gap-3">
            <div className="md:hidden" onClick={() => setOpen(!open)}>
              <IconButton>
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </div>

            <Link to={"/"}>
              <h1 className="text-lg md:text-2xl logo whitespace-nowrap">
                Bharat Bazar
              </h1>
            </Link>
          </div>

          {/* Column 2: Navigation (Desktop only) */}
          <div className="hidden md:flex justify-center items-center">
            <button onClick={() => navigate("/products")}>
              <h1 className="px-6 whitespace-nowrap text-lg font-semibold text-gray-600">
                All Products
              </h1>
            </button>
            <div
              className="hidden md:flex items-center justify-center"
              onMouseLeave={() => setActiveCategory(null)}
            >
              {categories.map((category) => (
                <div
                  key={category.categoryId}
                  onMouseEnter={() => setActiveCategory(category)}
                  className="relative px-4 lg:px-6 h-20 flex items-center"
                >
                  <span
                    className={`font-medium cursor-pointer transition-colors whitespace-nowrap ${
                      activeCategory?.categoryId === category.categoryId
                        ? "text-teal-600"
                        : "text-gray-800"
                    }`}
                  >
                    {category.categoryName}
                  </span>

                  {activeCategory?.categoryId === category.categoryId && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Actions */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden lg:flex items-center group">
              <div
                className="
      flex items-center
      justify-end
      w-10
      hover:w-72
      focus-within:w-72
      overflow-hidden
      border border-gray-300
      rounded-full
      bg-gray-50
      transition-all
      duration-300
      ease-in-out
    "
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="
                        w-0
                     group-hover:w-full
                      focus:w-full
                       flex-1
                        bg-transparent
                       outline-none
                          text-sm
                        px-2
                   transition-all
                  duration-300"
                />

                <IconButton size="small" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </div>
            </div>

            <div className="hidden md:block cursor-pointer">
              <IconButton>
                {isuserAuth ? (
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => {
                      navigate("/account/details");
                    }}
                  >
                    <Avatar src={profileImage} />

                    <p className="text-sm md:text-lg text-teal-600 px-2">
                      {userName}
                    </p>
                  </div>
                ) : (
                  <Link to={"/auth/register"}>
                    <AccountCircleIcon />
                  </Link>
                )}
              </IconButton>
            </div>

            <div className="hidden md:block cursor-pointer">
              <IconButton component={Link} to="/wishlist">
                <FavoriteBorderIcon />
              </IconButton>
            </div>

            <div className="hidden md:block">
              <IconButton component={Link} to="/cart">
                <AddShoppingCartIcon />
              </IconButton>
            </div>

            <div className="hidden lg:block">
              {isSellerAuth ? (
                <div
                  onClick={() => navigate("/seller/account")}
                  className="hover:cursor-pointer"
                >
                  <img
                    src={sellerProfile}
                    className="w-10 h-10 rounded-full"
                    alt={currentSeller?.sellerName}
                  />
                </div>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate("/auth/seller/register")}
                >
                  <div className="flex items-center gap-2">
                    <AddBusinessIcon />
                    <span className="text-teal-600 text-sm">Become Seller</span>
                  </div>
                </Button>
              )}
            </div>

            {isuserAuth && (
              <IconButton onClick={() => setProfileDrawerOpen(true)}>
                <MoreVertIcon />
              </IconButton>
            )}
          </div>
        </div>

        {/* Mega Menu */}
        {activeCategory && (
          <div
            className="hidden md:block absolute left-0 right-0 top-full bg-white border-t shadow-xl"
            onMouseEnter={() => setActiveCategory(activeCategory)}
            onMouseLeave={() => {
              setTimeout(() => {
                setActiveCategory(null);
              }, 500);
            }}
          >
            <div className="grid grid-cols-5 gap-6 px-10 lg:px-20 py-6">
              {activeCategory.level2Category?.map((sub: any) => (
                <div key={sub.id}>
                  <h2 className="font-semibold mb-2">{sub.name}</h2>

                  {sub.items?.map((item: string, index: number) => (
                    <p
                      onClick={() =>
                        navigate(`/products?search=${encodeURIComponent(item)}`)
                      }
                      key={index}
                      className="text-sm text-gray-600 py-1 cursor-pointer"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <MobileNav closeDrawer={() => setOpen(false)} />
      </Drawer>

      <Drawer
        anchor="right"
        open={profileDrawerOpen}
        onClose={() => setProfileDrawerOpen(false)}
      >
        <ProfileSidebar closeDrawer={() => setProfileDrawerOpen(false)} />
      </Drawer>
    </>
  );
};

export default Navbar;
