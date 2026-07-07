import { useNavigate } from "react-router-dom";
import { mainCategory } from "../Data/mainCategory";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useAppSelector } from "../../ReduxToolkit/store";
import { Avatar, Button } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MobileNav = ({ closeDrawer }: any) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();

  const handleNavigate = (path: any) => {
    navigate(path);
    closeDrawer();
  };

  // search for mobile
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    closeDrawer();
  };

  const isuserAuth = useAppSelector((state) => {
    return state.userAuth.isAuthenticated;
  });

  const userName = useAppSelector((state) => state.userData.userdata?.name);

  const profileImage = useAppSelector((state) => {
    return state.userData.profile;
  });

  const { mainCategories } = useAppSelector((state) => state.mainCategory);
  const categories = mainCategories.length > 0 ? mainCategories : mainCategory;
  const isSellerAuth = useAppSelector(
    (state) => state.auth.isSellerAuthenticated,
  );
  const sellerProfile = useAppSelector((state) => state.seller.profile);
  const currentSeller = useAppSelector((state) => state.seller.currentSeller);

  return (
    <div className="w-72 h-full p-4">
      <h2 className="text-xl font-bold mb-6">Bharat Bazar</h2>

      {/* Main Navigation */}
      <div className="space-y-2 border-b pb-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 mb-4 bg-gray-50">
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
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <button onClick={handleSearch}>
            <SearchIcon className="text-gray-600" />
          </button>
        </div>

        <button
          className="flex items-center gap-3 w-full py-2"
          onClick={() => handleNavigate("/auth/register")}
        >
          {isuserAuth ? (
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                navigate("/account/details");
              }}
            >
              <Avatar src={profileImage} />

              <p className="text-sm md:text-lg text-teal-600 px-2 font-bold">
                {userName}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AccountCircleIcon />
              <span>Account</span>
            </div>
          )}
        </button>

        <button
          className="flex items-center gap-3 w-full py-2"
          onClick={() => handleNavigate("/products")}
        >
          <Inventory2Icon />
          <span>All Products</span>
        </button>

        <button
          className="flex items-center gap-3 w-full py-2"
          onClick={() => handleNavigate("/wishlist")}
        >
          <FavoriteBorderIcon />
          <span>Wishlist</span>
        </button>

        <button
          className="flex items-center gap-3 w-full py-2"
          onClick={() => handleNavigate("/cart")}
        >
          <AddShoppingCartIcon />
          <span>Cart</span>
        </button>

        {isSellerAuth ? (
          <div
            onClick={() => navigate("/seller/account")}
            className="hover:cursor-pointer flex items-center "
          >
            <img
              src={sellerProfile}
              className="w-10 h-10 rounded-full"
              alt={currentSeller?.sellerName}
            />
            <h1 className="px-2">{currentSeller.sellerName}</h1>
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

      {/* Categories */}
      <h3 className="font-bold text-lg mb-3">Categories</h3>

      {categories.map((category) => (
        <div key={category.categoryId} className="border-b py-2">
          <button
            className="flex justify-between items-center w-full font-semibold py-2"
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category.categoryId
                  ? null
                  : category.categoryId,
              )
            }
          >
            <span>{category.categoryName}</span>

            {expandedCategory === category.categoryId ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </button>

          {expandedCategory === category.categoryId && (
            <div className="pl-4">
              {category.level2Category?.map((sub) => (
                <div key={sub.id}>
                  <button
                    className="flex justify-between items-center w-full py-2 text-sm font-medium"
                    onClick={() =>
                      setExpandedSubCategory(
                        expandedSubCategory === sub.id ? null : sub.id,
                      )
                    }
                  >
                    <span>{sub.name}</span>

                    {expandedSubCategory === sub.id ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </button>

                  {expandedSubCategory === sub.id && (
                    <div className="pl-4">
                      {sub.items?.map((item, index) => (
                        <button
                          key={index}
                          className="block w-full text-left py-1 text-gray-600 hover:text-teal-600"
                          onClick={() => {
                            handleNavigate(
                              `/products?search=${encodeURIComponent(item)}`,
                            );
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileNav;
