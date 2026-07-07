import ElectronicCategory from "../../customer/pages/homepage/ElectronicCategory";
import GridSection from "../../customer/pages/homepage/GridSection";
import Deal from "../../customer/pages/homepage/Deals/Deal";
import HomeCategory from "../../customer/pages/homepage/Deals/HomeCategory/HomeCategory";

const HomeRoutes = () => {
  return (
    <div>
      <ElectronicCategory />
      <GridSection />
      <Deal />
      <HomeCategory />
    </div>
  );
};

export default HomeRoutes;
