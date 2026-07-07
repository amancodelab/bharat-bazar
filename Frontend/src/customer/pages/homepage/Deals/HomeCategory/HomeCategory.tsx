import HomeCategoryCard from "./HomeCategoryCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../ReduxToolkit/store";
import { useEffect } from "react";
import { fetchShopCategories } from "../../../../../ReduxToolkit/Features/Admin/shopCategorySlice";

const HomeCategory = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchShopCategories());
  }, [dispatch]);
  const homeCategories = useAppSelector(
    (state) => state.shopCategory.shopCategories,
  );

  console.log("HomeCategory or selectByCategories");
  console.log("HomeCategories:", homeCategories);
  // const homeCategories: HomeCategoryType[] = [
  //   {
  //     id: "1",
  //     link: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
  //     name: "Lighting",
  //   },
  //   {
  //     id: "2",
  //     link: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500",
  //     name: "Furniture",
  //   },
  //   {
  //     id: "3",
  //     link: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
  //     name: "Sofas",
  //   },
  //   {
  //     id: "4",
  //     link: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
  //     name: "Decor",
  //   },
  //   {
  //     id: "5",
  //     link: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500",
  //     name: "Bedroom",
  //   },
  //   {
  //     id: "6",
  //     link: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500",
  //     name: "Kitchen",
  //   },
  // ];

  return (
    <div className="flex justify-content items-center gap-4 my-2 flex-wrap px-5 lg:px-20">
      {homeCategories.map((homeCategory) => (
        <HomeCategoryCard key={homeCategory._id} homeCategory={homeCategory} />
      ))}
    </div>
  );
};

export default HomeCategory;
