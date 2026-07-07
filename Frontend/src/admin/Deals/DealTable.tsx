import { Delete, Edit } from "@mui/icons-material";
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
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { deleteDeals } from "../../ReduxToolkit/Features/Admin/DealsSlice";

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
  "&:last-child td,&:last-child th": {
    border: 0,
  },
}));

const DealTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { deals, loading } = useAppSelector((state: any) => state.deal);

  const handleDelete = (dealId: string) => {
    if (window.confirm("Delete this Deal?")) {
      dispatch(deleteDeals(dealId));
    }
  };

  if (loading) {
    return <h2 className="text-center text-xl font-semibold">Loading...</h2>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {deals.length > 0 ? (
            deals.map((deal: any, index: number) => (
              <StyledTableRow key={deal._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>

                <StyledTableCell>
                  <img
                    src={deal.image}
                    alt={deal.level3}
                    className="w-20 h-20 rounded object-cover"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  {`${deal.level1} → ${deal.level2} → ${deal.level3}`}
                </StyledTableCell>

                <StyledTableCell>{deal.discount}%</StyledTableCell>

                <StyledTableCell align="center">
                  <Edit
                    color="primary"
                    className="cursor-pointer"
                    onClick={() => {
                      console.log(
                        "Navigatin link:",
                        `/admin/deals/edit/${deal._id}`,
                      );
                      navigate(`/admin/deals/edit/${deal._id}`);
                    }}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Delete
                    color="error"
                    className="cursor-pointer"
                    onClick={() => handleDelete(deal._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Deals Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DealTable;
