import { Container } from "@mui/system";
import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";



const Home = ({
  transactions,
  fetchTransactions,
  setEditTransactions,
  editTransactions,
}) => {
  return (
    <>
   
      <Container>
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransactions={editTransactions}
          setEditTransactions={setEditTransactions}
        />
        <TransactionList
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          setEditTransactions={setEditTransactions}
        />
      </Container>
    </>
  );
};

export default Home;
