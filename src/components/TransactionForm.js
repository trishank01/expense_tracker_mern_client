import React, { useState } from "react";
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

const TransactionForm = ({fetchTransactions}) => {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setFormSubmit([...formSubmit , form])
  const res =  await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    setForm({
      amount: 0,
      description: "",
      date: null,
    });

    if(res.ok){
      fetchTransactions()
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
     setForm({...form , date :newValue})
  }
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
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }}   
             size="small"  {...params} />
              )}
            />
          </LocalizationProvider>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
