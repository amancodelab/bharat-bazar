import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Chip } from "@mui/material";

interface OrderCardProps {
  order: any;
  onView: () => void;
  onCancel: () => void;
}

const OrderCard = ({ order, onView, onCancel }: OrderCardProps) => {
  console.log("Orders", order);
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <h2 className="font-semibold text-lg">
            Order #{order._id.slice(-8).toUpperCase()}
          </h2>

          <p className="text-sm text-gray-500">
            {new Date(order.orderDate).toLocaleDateString("en-IN")}
          </p>
        </div>

        <Chip
          color={order.paymentStatus === "COMPLETED" ? "success" : "warning"}
          label={order.paymentStatus}
        />
      </div>

      {/* Order Info */}
      <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon fontSize="small" />
            <span>
              <strong>Items:</strong> {order.orderItems.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PaymentIcon fontSize="small" />
            <span>
              <strong>Total:</strong> ₹{order.totalSellingPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <LocalShippingIcon fontSize="small" />
            <span>
              <strong>Status:</strong> {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p>
            <strong>Seller</strong>
          </p>

          <p className="text-gray-600">{order.seller?.sellerName}</p>

          <p>
            <strong>Payment</strong>
          </p>

          <p className="text-gray-600">{order.paymentStatus}</p>
        </div>
      </div>

      {/* Product Preview */}
      <div className="mt-5 flex items-center gap-4">
        <img
          src={order.orderItems[0]?.product.images[0]}
          className="w-20 h-20 rounded-lg border object-cover"
          alt={order.orderItems[0]?.product.title}
        />

        <div className="flex-1">
          <h3 className="font-medium">{order.orderItems[0]?.product.title}</h3>

          <p className="text-sm text-gray-500">
            {order.orderItems.length > 1 &&
              `+ ${order.orderItems.length - 1} more item(s)`}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={onView}
        >
          View Details
        </Button>

        {order.orderStatus !== "DELIVERED" &&
          order.orderStatus !== "CANCELLED" && (
            <Button
              color="error"
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
      </div>
    </div>
  );
};

export default OrderCard;
