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
  fetchElectronics,
  deleteElectronic,
} from "../../../ReduxToolkit/Features/Admin/electronicSlice";

interface Electronic {
  _id: string;
  categoryId: string;
  image: string;
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

const ElectronicsTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { electronics, loading } = useAppSelector((state) => state.electronic);

  const { mainCategories } = useAppSelector((state: any) => state.mainCategory);

  useEffect(() => {
    dispatch(fetchElectronics());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this electronic category?")) {
      dispatch(deleteElectronic(id));
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = mainCategories.find(
      (item: any) => item.categoryId === categoryId,
    );

    return category?.categoryName || categoryId;
  };

  if (loading) {
    return <h2 className="text-center text-lg font-semibold">Loading...</h2>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {electronics.length > 0 ? (
            electronics.map((item: Electronic, index: number) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>

                <StyledTableCell>
                  <img
                    src={item.image}
                    alt={item.categoryId}
                    className="w-20 h-20 rounded object-cover"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  {getCategoryName(item.categoryId)}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Edit
                    color="primary"
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/electric-category/edit/${item._id}`)
                    }
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
              <TableCell align="center" colSpan={5}>
                No Electronics Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ElectronicsTable;
