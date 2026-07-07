import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "../../ReduxToolkit/store";

const ProductTable = () => {
  const { products, loading } = useAppSelector((state) => state.sellerProducts);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <h1 className="text-xl font-semibold">Loading Products...</h1>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-275 w-full text-sm">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-4 text-left">Images</th>
              <th className="px-4 py-4 text-center">ID</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-center">MRP</th>
              <th className="px-4 py-4 text-center">Selling</th>
              <th className="px-4 py-4 text-center">Discount</th>
              <th className="px-4 py-4 text-center">Size</th>
              <th className="px-4 py-4 text-center">Color</th>
              <th className="px-4 py-4 text-center">Stock</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Images */}
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {product.images
                        ?.slice(0, 3)
                        .map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            alt={product.title}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-lg border object-cover"
                          />
                        ))}

                      {product.images?.length > 3 && (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg border flex items-center justify-center bg-gray-100 font-semibold">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* ID */}
                  <td className="text-center font-semibold">
                    {product._id.slice(-6)}
                  </td>

                  {/* Title */}
                  <td className="px-4">
                    <div className="font-semibold">{product.title}</div>

                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </div>
                  </td>

                  {/* MRP */}
                  <td className="text-center">₹{product.mrp}</td>

                  {/* Selling */}
                  <td className="text-center text-green-600 font-semibold">
                    ₹{product.sellingPrice}
                  </td>

                  {/* Discount */}
                  <td className="text-center">{product.discountPercent}%</td>

                  {/* Size */}
                  <td className="text-center">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                      {product.size}
                    </span>
                  </td>

                  {/* Color */}
                  <td className="text-center">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">
                      {product.color}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="text-center">
                    <Button
                      variant="outlined"
                      size="small"
                      color={product.quantity > 10 ? "success" : "warning"}
                    >
                      {product.quantity}
                    </Button>
                  </td>

                  {/* Action */}
                  <td className="text-center">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="py-10 text-center text-gray-500 font-semibold"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
