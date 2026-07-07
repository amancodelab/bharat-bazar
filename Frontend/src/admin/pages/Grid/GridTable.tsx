import { useEffect } from "react";
import { Edit, Delete } from "@mui/icons-material";
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

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";

import {
  fetchGrids,
  deleteGrid,
} from "../../../ReduxToolkit/Features/Admin/gridSlice";

interface GridItem {
  _id: string;
  image: string;
  level1: string;
  level2: string;
  level3: string;
}

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

const GridTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { grids, loading } = useAppSelector((state) => state.grid);

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  useEffect(() => {
    dispatch(fetchGrids());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this Grid Category?")) {
      dispatch(deleteGrid(id));
    }
  };

  const getMainCategoryName = (categoryId: string) => {
    const category = (mainCategories as any[]).find(
      (item) => item.categoryId === categoryId,
    );

    return category?.categoryName || categoryId;
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Main Category</StyledTableCell>
            <StyledTableCell>Sub Category</StyledTableCell>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {grids.length > 0 ? (
            grids.map((item: GridItem, index: number) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>

                <StyledTableCell>
                  <img
                    src={item.image}
                    alt={item.level2}
                    className="w-20 h-20 object-cover rounded"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  {getMainCategoryName(item.level1)}
                </StyledTableCell>

                <StyledTableCell>{item.level2}</StyledTableCell>

                <StyledTableCell>{item.level3 || "-"}</StyledTableCell>

                <StyledTableCell align="center">
                  <Edit
                    color="primary"
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/grid/edit/${item._id}`)}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Delete
                    color="error"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={7}>
                No Grid Categories Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GridTable;
