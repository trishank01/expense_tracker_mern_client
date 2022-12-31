import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


const TransactionForm = ({ fetchTransactions, editTransactions , setEditTransactions }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: null,
  });

  useEffect(() => {
    if (editTransactions.amount !== undefined) {
      setForm(editTransactions);
    }
  }, [editTransactions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   editTransactions.amount === undefined ? create() : update();
  };

  const reload = (res) => {
    if (res.ok) {
        setForm({
            amount: "",
            description: "",
            date: null,
          });
      fetchTransactions();
    }
}

  const create = async () => {
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    reload(res);
  };

  const update = async () => {
    const res = await fetch(
      `http://localhost:4000/transaction/${editTransactions._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setEditTransactions({})
    reload(res);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  console.log(editTransactions)
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ marginRight: 5 }} variant="h6">
            Add New Transaction
          </Typography>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={form.amount}
            onChange={handleInput}
            name="amount"
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            value={form.description}
            onChange={handleInput}
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>

          {editTransactions.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
          {editTransactions.amount !== undefined && (
            <Button type="submit" variant="contained">
              Update
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
