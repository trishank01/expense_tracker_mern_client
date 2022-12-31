import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { EditSharp, DeleteSharp } from "@mui/icons-material";
import dayjs from "dayjs";


const TransactionList = ({ transactions, fetchTransactions , setEditTransactions }) => {
  const remove = async (id) => {
    if (!window.confirm("Are you sure")) return;
    const res = await fetch(`http://localhost:4000/transaction/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTransactions();
      window.alert(`Deleted Successfully`);
    }
  };

  const formatDate = (date) => {
      return dayjs(date).format('DD-MMM, YYYY')
  }


  return (
    <>
      <Typography sx={{ marginTop: 10, marginBottom: 2 }} variant="h6">
        List Of Transaction
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" onClick={() => setEditTransactions(row)}>
                    <EditSharp />
                  </IconButton>
                  <IconButton
                    color="error"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteSharp />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionList;
