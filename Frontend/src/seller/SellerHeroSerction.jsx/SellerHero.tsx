import { Button } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const SellerHero = () => {
  return (
    <div className="relative w-full  px-5 lg:px-20 h-60 lg:h-175 p-2 m-2">
      <div className="text-3xl logo lg:text-6xl font-bold text-blue-600 absolute top-1/10 left-1/10">
        Sell{" "}
      </div>
      <div className="flex logo justify-center items-center gap-2 text-3xl lg:text-6xl lg:top-1/5 font-bold text-black absolute top-1/4 left-1/10">
        <h1>Your</h1>
        <h1 className="text-yellow-400 font-bold">Product</h1>
      </div>

      <img
        className="w-full h-full border object-cover rounded-2xl"
        src={"./sellerHeroSection.png"}
      ></img>
      <Button
        startIcon={
          <span className="hidden lg:block">
            <AddBusinessIcon />
          </span>
        }
        className="absolute! w-40 text-[12px]  h-8 lg:text-sm lg:w-50  lg:h-12 lg:text-[18px] lg:left-1/8 bottom-1/7 left-1/12 text-center rounded-2xl! lg:bottom-1/10"
        variant="contained"
      >
        Become Seller
      </Button>
      <div className="flex justify-center flex-col items-center lg:gap-4 absolute lg:top-[33%] top-[38%]  left-[12%] lg:left-[20%] ]">
        <h1 className="text-xl font-bold lg:text-4xl">With</h1>
        <h1 className="logo text-2xl text-orange-500 font-bold lg:text-5xl">Bhart bazar</h1>
      </div>
    </div>
  );
};

export default SellerHero;
