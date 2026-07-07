import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit } from "@mui/icons-material";

import { useAppSelector } from "../../ReduxToolkit/store";

import { useNavigate } from "react-router-dom";

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

export default function DealCategoryTable() {
  const { deals, loading } = useAppSelector((state: any) => state.deal);
  console.log("dealtabledata", deals);
  const navigate = useNavigate();
  if (loading) {
    return <h2 className="text-center text-xl font-semibold">Loading...</h2>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((data: any, index: number) => (
            <StyledTableRow key={data._id}>
              <StyledTableCell>
                <div>
                  <p>{index + 1}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <h1>{data._id}</h1>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <img src={data.image} className="w-20 object-cover" />
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <h1>{data.level1}</h1>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <h1>{data.discount}</h1>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div onClick={() => navigate(`/admin/deals/edit/${data._id}`)}>
                  <Edit color="primary" />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
