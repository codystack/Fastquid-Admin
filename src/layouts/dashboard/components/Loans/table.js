import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function RecentLoanTable() {
  const { recentLoans } = useSelector((state) => state.loan);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">TYPE</TableCell>
            <TableCell align="left">BORROWED</TableCell>
            <TableCell align="left">INTEREST</TableCell>
            <TableCell align="left">TOTAL DUE</TableCell>
            <TableCell align="left">DURATION</TableCell>
            <TableCell align="left">STATUS</TableCell>
          </TableRow>
        </TableHead>
        {recentLoans && (
          <TableBody>
            {recentLoans?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row?.type}</TableCell>
                <TableCell align="left">{row?.amountBorrowed}</TableCell>
                <TableCell align="left">{row?.interestAmount}</TableCell>
                <TableCell align="left">{row.totalAmountDue}</TableCell>
                <TableCell align="left">{row?.duration}</TableCell>
                <TableCell align="left">{row?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
