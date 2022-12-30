import { useEffect, useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/AppBarMenu";
import TransactionForm from "./components/TransactionForm";


function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  },[]);


  return (
    <>
    <ButtonAppBar/>
    <TransactionForm fetchTransactions={fetchTransactions}/>
      <br />
      <table>
        <thead>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
