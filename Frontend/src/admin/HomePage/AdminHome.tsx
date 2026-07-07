import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/store";
import { useEffect } from "react";
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

export default function AdminHomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("admin_jwt");
  useEffect(() => {
    if (!jwt) {
      navigate("/admin/login");
    }
  }, [dispatch, jwt]);
  const ElectronicsCategories = useAppSelector(
    (state) => state.electronic.electronics,
  );
  console.log("elect", ElectronicsCategories);
  const loading1 = useAppSelector((state) => state.electronic.loading);

  const SelectByCategories = useAppSelector(
    (state) => state.shopCategory.shopCategories,
  );
  console.log("select", SelectByCategories);
  const loading2 = useAppSelector((state) => state.shopCategory.loading);

  const HeroSections = useAppSelector((state) => state.banner.banners);
  const loading3 = useAppSelector((state) => state.banner.loading);
  console.log("HeroSection", HeroSections);
  const Grids = useAppSelector((state) => state.grid.grids);
  const loading4 = useAppSelector((state) => state.grid.loading);
  console.log("Grid", Grids);

  if (loading1 || loading2 || loading3 || loading4) {
    return <h1 className="text-lg text-center">loading.......</h1>;
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
          </TableRow>
        </TableHead>
        <TableBody>
          {HeroSections.map((data: any, index) => (
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
                  <h1>{data.title}</h1>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

        <TableBody>
          {Grids.map((data: any, index) => (
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
                  <h1>{data.level2}</h1>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

        <TableBody>
          {SelectByCategories.map((data: any, index) => (
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
                  <h1>{data.categoryId}</h1>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
