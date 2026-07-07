import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import {
  deleteCoupons,
  fetchAllCoupons,
} from "../../ReduxToolkit/Features/Admin/couponSlice";

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CouponTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { coupons, loading } = useAppSelector(
    (state: any) => state.adminCoupon,
  );

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const handleDelete = (couponId: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupons(couponId));
    }
  };

  if (loading) {
    return <h1 className="text-center text-2xl font-semibold">Loading...</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>

            <StyledTableCell>Starting Date</StyledTableCell>

            <StyledTableCell>Expiry Date</StyledTableCell>

            <StyledTableCell>Minimum Order</StyledTableCell>

            <StyledTableCell>Discount</StyledTableCell>

            <StyledTableCell>Max Discount</StyledTableCell>

            <StyledTableCell>Usage</StyledTableCell>

            <StyledTableCell>Status</StyledTableCell>

            <StyledTableCell align="center">Edit</StyledTableCell>

            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coupons.length > 0 ? (
            coupons.map((coupon: any) => (
              <StyledTableRow key={coupon._id}>
                <StyledTableCell>{coupon.code}</StyledTableCell>

                <StyledTableCell>
                  <div>
                    <p>{dayjs(coupon.startingDate).format("DD/MM/YYYY")}</p>

                    <p>{dayjs(coupon.startingDate).format("hh:mm A")}</p>
                  </div>
                </StyledTableCell>

                <StyledTableCell>
                  <div>
                    <p>{dayjs(coupon.expiryDate).format("DD/MM/YYYY")}</p>

                    <p>{dayjs(coupon.expiryDate).format("hh:mm A")}</p>
                  </div>
                </StyledTableCell>

                <StyledTableCell>₹{coupon.minOrderAmount}</StyledTableCell>

                <StyledTableCell>{coupon.discount}%</StyledTableCell>

                <StyledTableCell>₹{coupon.maxDiscountAmount}</StyledTableCell>

                <StyledTableCell>
                  {coupon.usedCount} / {coupon.usageLimit}
                </StyledTableCell>

                <StyledTableCell>
                  {coupon.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <EditIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/coupon/edit/${coupon._id}`)}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <DeleteIcon
                    color="error"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(coupon._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={10} align="center">
                No Coupons Found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CouponTable;
