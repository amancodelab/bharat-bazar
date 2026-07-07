import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 600,
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

interface Props {
  transactions: any[];
}

export default function TransactionTable({ transactions }: Props) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 1100 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Transaction ID</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="center">Items</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Payment</StyledTableCell>
            <StyledTableCell align="center">Order Status</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((transaction: any) => (
            <StyledTableRow key={transaction._id}>
              {/* Date */}
              <StyledTableCell>
                <div className="flex flex-col">
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </span>
                </div>
              </StyledTableCell>

              {/* Transaction ID */}
              <StyledTableCell>#{transaction._id.slice(-8)}</StyledTableCell>

              {/* Customer */}
              <StyledTableCell>
                #{transaction.customer.slice(-8)}
              </StyledTableCell>

              {/* Order */}
              <StyledTableCell>
                #{transaction.order._id.slice(-8)}
              </StyledTableCell>

              {/* Items */}
              <StyledTableCell align="center">
                {transaction.order.totalItem}
              </StyledTableCell>

              {/* Amount */}
              <StyledTableCell align="center">
                ₹{transaction.order.totalSellingPrice}
              </StyledTableCell>

              {/* Payment */}
              <StyledTableCell align="center">
                <Chip
                  label={transaction.order.paymentStatus}
                  color={
                    transaction.order.paymentStatus === "COMPLETED"
                      ? "success"
                      : "warning"
                  }
                  size="small"
                />
              </StyledTableCell>

              {/* Order Status */}
              <StyledTableCell align="center">
                <Chip
                  label={transaction.order.orderStatus}
                  color={
                    transaction.order.orderStatus === "DELIVERED"
                      ? "success"
                      : transaction.order.orderStatus === "SHIPPED"
                        ? "primary"
                        : transaction.order.orderStatus === "CANCELLED"
                          ? "error"
                          : "warning"
                  }
                  size="small"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
