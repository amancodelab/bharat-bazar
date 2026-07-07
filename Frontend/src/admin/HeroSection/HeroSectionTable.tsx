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

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";

import {
  fetchBannerAll,
  deleteBannerById,
} from "../../ReduxToolkit/Features/Admin/bannerSlice";

interface HeroSection {
  _id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  role: string;
  image: string;
  active: boolean;
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

const HeroSectionTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { banners, loading } = useAppSelector((state: any) => state.banner);

  useEffect(() => {
    dispatch(fetchBannerAll());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this hero section?")) {
      dispatch(deleteBannerById(id));
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
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {banners.length > 0 ? (
            banners.map((item: HeroSection, index: number) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>

                <StyledTableCell>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-16 rounded object-cover"
                  />
                </StyledTableCell>

                <StyledTableCell>{item.title}</StyledTableCell>

                <StyledTableCell className="capitalize">
                  {item.role.replace("_", " ")}
                </StyledTableCell>

                <StyledTableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      item.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Edit
                    color="primary"
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/hero-section/edit/${item._id}`)
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
              <TableCell colSpan={7} align="center">
                No Hero Sections Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HeroSectionTable;
