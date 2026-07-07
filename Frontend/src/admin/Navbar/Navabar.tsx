import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSlider from "./AdminSlider";

const Navabar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-20  px-5 py-2 md:py-4 md:px-10 logo border-gray-400 border-b-2 
  "
    >
      <div className="flex gap-2 items-center ">
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <h1
          className="text-2xl md:text-3xl px-4 "
          onClick={() => {
            navigate("/admin");
          }}
        >
          Bharat Bazar
        </h1>
      </div>

      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AdminSlider />
      </Drawer>
    </div>
  );
};

export default Navabar;
