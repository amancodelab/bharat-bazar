import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, MenuItem } from "@mui/material";
import { FormControl, Select } from "@mui/material";
import { useAppDispatch } from "../../ReduxToolkit/store";
import {
  fetchSellerOrder,
  updatedOrderStatus,
} from "../../ReduxToolkit/Features/Seller/sellerOrderSlice";
import { useState } from "react";
import ErrorAlert from "../../util/ErrorAlert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const jwt = localStorage.getItem("seller_jwt");

export default function OrderTable({ orders }: any) {
  const orderStatus = [
    { color: "#FFA500", label: "PENDING" },
    { color: "#F5BCBA", label: "PLACED" },
    { color: "#F5BCBA", label: "CONFIRMED" },
    { color: "#1E90FF", label: "SHIPPED" },
    { color: "#32CD32", label: "DELIVERED" },
    { color: "#FF0000", label: "CANCELLED" },
  ];
  const [authError, setAuthError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleUpdateOrder = async (id: any, status: any) => {
    try {
      if (!jwt) {
        return setAuthError(true);
      }
      console.log("Update Order", id, status);
      await dispatch(
        updatedOrderStatus({
          jwt: jwt,
          orderId: id,
          updatedOrderStatus: status,
        }),
      ).unwrap();

      dispatch(fetchSellerOrder(jwt));
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <>
      {authError ? <ErrorAlert error="First login or Register" /> : null}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflowX: "auto",
          boxShadow: 2,
        }}
      >
        <Table
          sx={{
            minWidth: 1100,
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "16%" }}>Order ID</StyledTableCell>

              <StyledTableCell sx={{ width: "38%" }}>Products</StyledTableCell>

              <StyledTableCell sx={{ width: "22%" }}>
                Shipping Address
              </StyledTableCell>

              <StyledTableCell align="center" sx={{ width: "12%" }}>
                Status
              </StyledTableCell>

              <StyledTableCell align="center" sx={{ width: "12%" }}>
                Update
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order: any) => (
              <StyledTableRow key={order._id}>
                {/* Order Id */}
                <StyledTableCell>
                  <div className="font-medium text-sm break-all">
                    #{order._id.slice(-8)}
                  </div>
                </StyledTableCell>

                {/* Products */}
                <StyledTableCell>
                  <div className="flex flex-col gap-3">
                    {order.orderItems.map((item: any) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover border shrink-0"
                        />

                        <div className="flex flex-col">
                          <h1 className="font-semibold text-sm">
                            {item.product.title}
                          </h1>

                          <p className="text-xs text-gray-500">
                            Qty : {item.quantity}
                          </p>

                          <p className="text-xs text-teal-600 font-medium">
                            ₹{item.product.sellingPrice}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </StyledTableCell>

                {/* Shipping */}
                <StyledTableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium line-clamp-2"></p>
                    <p className="text-sm font-medium line-clamp-2">
                      {order.shippingAddress.mobile}
                    </p>

                    <p className="text-sm font-medium line-clamp-2">
                      {order.shippingAddress.address}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </StyledTableCell>

                {/* Status */}
                <StyledTableCell align="center">
                  <Chip
                    label={order.orderStatus}
                    color={
                      order.orderStatus === "DELIVERED"
                        ? "success"
                        : order.orderStatus === "SHIPPED"
                          ? "primary"
                          : order.orderStatus === "CANCELLED"
                            ? "error"
                            : "warning"
                    }
                    size="small"
                  />
                </StyledTableCell>

                {/* Update */}
                <StyledTableCell align="center">
                  <FormControl size="small" fullWidth>
                    <Select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleUpdateOrder(order._id, e.target.value)
                      }
                    >
                      {orderStatus.map((status) => (
                        <MenuItem key={status.label} value={status.label}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
