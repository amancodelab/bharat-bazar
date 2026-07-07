import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import {
  getAllSeller,
  getSellerWithStatus,
} from "../../ReduxToolkit/Features/Admin/adminSlice";
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const accountStatuses = [
  {
    name: "All Sellers",
    value: "all",
  },
  {
    name: "Pending Verification",
    value: "pending_verification",
  },
  {
    name: "Active",
    value: "active",
  },
  {
    name: "Suspended",
    value: "suspended",
  },
  {
    name: "Deactivated",
    value: "deactivated",
  },
  {
    name: "Banned",
    value: "banned",
  },
  {
    name: "Closed",
    value: "closed",
  },
];

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

export default function SellerTable() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      status: "all",
    },

    onSubmit: (values) => {
      if (values.status === "all") {
        dispatch(getAllSeller());
      } else {
        dispatch(getSellerWithStatus(values.status));
      }
    },
  });
  useEffect(() => {
    dispatch(getAllSeller());
  }, []);
  const sellers = useAppSelector((state) => state.admin.sellers);
  const navigate = useNavigate();
  return (
    <div>
      {/* Filter */}
      <div className="w-48 md:w-72 px-4 py-4">
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Account Status</InputLabel>

            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formik.values.status}
              label="Account Status"
              onChange={formik.handleChange}
            >
              {accountStatuses.map((status) => (
                <MenuItem
                  key={status.name}
                  value={status.value}
                  defaultValue={"all"}
                >
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button sx={{ mt: 2 }} fullWidth variant="contained" type="submit">
            Filter
          </Button>
        </form>
      </div>

      {/* Seller Table */}
      <div className="w-full overflow-x-auto">
        <TableContainer component={Paper}>
          <Table className="min-w-max">
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Mobile</StyledTableCell>
                <StyledTableCell>GSTIN</StyledTableCell>
                <StyledTableCell>Business Name</StyledTableCell>
                <StyledTableCell>Account Status</StyledTableCell>
                <StyledTableCell>Change Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sellers.map((seller) => (
                <StyledTableRow key={seller._id}>
                  <StyledTableCell>{seller.sellerName}</StyledTableCell>
                  <StyledTableCell>{seller.email}</StyledTableCell>
                  <StyledTableCell>{seller.mobile}</StyledTableCell>
                  <StyledTableCell>{seller.GSTIN}</StyledTableCell>
                  <StyledTableCell>
                    {seller.businessDetails.businessName}
                  </StyledTableCell>
                  <StyledTableCell>{seller.accountStatus}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/admin/seller/accountstatus/${seller.accountStatus}/edit/${seller._id}`,
                        )
                      }
                    >
                      <Edit color="primary" className="cursor-pointer"></Edit>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
