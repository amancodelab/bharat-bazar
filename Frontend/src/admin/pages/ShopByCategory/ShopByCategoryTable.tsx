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
  fetchShopCategories,
  deleteShopCategory,
} from "../../../ReduxToolkit/Features/Admin/shopCategorySlice";

interface ShopCategory {
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

const ShopCategoryTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { shopCategories, loading } = useAppSelector(
    (state: any) => state.shopCategory,
  );

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  useEffect(() => {
    dispatch(fetchShopCategories());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this shop category?")) {
      dispatch(deleteShopCategory(id));
    }
  };

  const getCategoryName = (categoryId: string) => {
    for (const main of mainCategories as any[]) {
      const level2 = main.level2Category.find(
        (item: any) => item.name === categoryId,
      );

      if (level2) {
        return `${main.categoryName} → ${level2.name}`;
      }
    }

    return categoryId;
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
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {shopCategories.length > 0 ? (
            shopCategories.map((item: ShopCategory, index: number) => (
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
                      navigate(`/admin/shop-category/edit/${item._id}`)
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
              <TableCell colSpan={5} align="center">
                No Shop Categories Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShopCategoryTable;
