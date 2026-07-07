import { useAppSelector } from "../../../ReduxToolkit/store";

// type ElectronicItem = {
//   section: string;
//   name: string;
//   image: string;
//   categoryId: string;
// };

// const electronic: ElectronicItem[] = [
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Laptop",
//     image:
//       "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/c/i/9/-original-imahhmfyvdadkyjq.jpeg?q=90",
//     categoryId: "laptop",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Phone",
//     image:
//       "https://rukminim2.flixcart.com/image/1528/1528/xif0q/mobile/f/v/m/-original-imahft6chnx2vbuy.jpeg?q=90",
//     categoryId: "phone",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "SmartWatch",
//     image:
//       "https://rukminim2.flixcart.com/image/1528/1528/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=90",
//     categoryId: "smartWatch",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Tv",
//     image:
//       "https://rukminim2.flixcart.com/image/1528/1528/xif0q/television/k/x/6/-original-imahj8ydnwrzh4hd.jpeg?q=90",
//     categoryId: "tv",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "HeadPhone",
//     image:
//       "https://rukminim2.flixcart.com/image/1528/1528/xif0q/headphone/z/f/g/-original-imahm9xqgnzbaczt.jpeg?q=90",
//     categoryId: "headPhone",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Camera",
//     image:
//       "https://images.pexels.com/photos/31074392/pexels-photo-31074392.jpeg",
//     categoryId: "camera",
//   },
// ];

const ElectronicCategory: React.FC = () => {
  const elecronics = useAppSelector((state) => state.electronic.electronics);
  console.log("elecroini of category", elecronics);
  return (
    <div className="flex justify-around w-full m-1 py-5 border-b  h-20 items-center hover:cursor-pointer md:mb-1 mb-2">
      {elecronics.map((elecronic) => (
        <div
          className="flex h-17 flex-col justify-between cursor-pointer items-center gap-x-3 gap-y-1"
          key={elecronic._id}
        >
          <img
            className="h-12 w-12 object-cover"
            src={elecronic.image}
            alt="Product Category"
          />

          <h1 className="font-semibold ">{elecronic.categoryId}</h1>
        </div>
      ))}
    </div>
  );
};

export default ElectronicCategory;
