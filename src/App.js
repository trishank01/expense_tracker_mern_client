import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/AppBarMenu";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransactions, setEditTransactions] = useState({});

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <ButtonAppBar />
        <Container>
        <TransactionForm fetchTransactions={fetchTransactions} editTransactions={editTransactions}  setEditTransactions={setEditTransactions}/>
        <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} setEditTransactions={setEditTransactions} />
      </Container>
    </>
  );
}

export default App;
