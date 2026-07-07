import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { fetchGrids } from "../../../ReduxToolkit/Features/Admin/gridSlice";

const GridSection = () => {
  const dispatch = useAppDispatch();

  const { grids } = useAppSelector((state) => state.grid);

  useEffect(() => {
    dispatch(fetchGrids());
  }, [dispatch]);

  if (grids.length < 6) return null;

  // FIX 1: Sort the data by the position field so index 0 is always position 1
  const sortedGrids = [...grids].sort((a, b) => a.position - b.position);

  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-4 px-5 lg:px-20 rounded-md lg:h-150 lg:mt-5">
      {/* Position 1 */}
      <div className="col-span-12 row-span-12 lg:col-span-3 lg:row-span-12 rounded-md">
        {/* FIX 2: Swap out categoryId for your actual Schema fields (level2 for ID, level1 for Name) */}
        <Link to={`/products/category/${sortedGrids[0].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[0].image}
            alt={sortedGrids[0].level1}
          />
        </Link>
      </div>

      {/* Position 2 */}
      <div className="col-span-12 row-span-12 lg:row-span-6 lg:col-span-2 rounded-md lg:col-start-4">
        <Link to={`/products/category/${sortedGrids[1].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[1].image}
            alt={sortedGrids[1].level1}
          />
        </Link>
      </div>

      {/* Position 3 */}
      <div className="col-span-12 row-span-12 lg:row-span-6 lg:col-span-4 rounded-md lg:col-start-6">
        <Link to={`/products/category/${sortedGrids[2].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[2].image}
            alt={sortedGrids[2].level1}
          />
        </Link>
      </div>

      {/* Position 4 */}
      <div className="col-span-12 row-span-12 lg:row-span-6 lg:col-span-4 rounded-md lg:col-start-4">
        <Link to={`/products/category/${sortedGrids[3].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[3].image}
            alt={sortedGrids[3].level1}
          />
        </Link>
      </div>

      {/* Position 5 */}
      <div className="col-span-12 row-span-12 lg:row-span-6 lg:col-span-2 rounded-md lg:col-start-8">
        <Link to={`/products/category/${sortedGrids[4].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[4].image}
            alt={sortedGrids[4].level1}
          />
        </Link>
      </div>

      {/* Position 6 */}
      <div className="col-span-12 row-span-12 lg:col-span-3 lg:row-span-12 rounded-md lg:col-start-10 lg:row-start-1">
        <Link to={`/products/category/${sortedGrids[5].level2}`}>
          <img
            className="rounded-md h-full w-full object-cover"
            src={sortedGrids[5].image}
            alt={sortedGrids[5].level1}
          />
        </Link>
      </div>
    </div>
  );
};

export default GridSection;
