import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

interface Props {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellerNavbar = ({ setOpenDrawer }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-20 border-b border-gray-200 flex items-center px-5 md:px-10">
      {/* Mobile Menu Button */}
      <IconButton className="lg:hidden" onClick={() => setOpenDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <h1
        onClick={() => navigate("/")}
        className="text-xl logo lg:text-2xl px-4 cursor-pointer font-semibold"
      >
        Bharat Bazar
      </h1>
    </div>
  );
};

export default SellerNavbar;
