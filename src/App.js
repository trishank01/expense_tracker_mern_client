import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ButtonAppBar from "./components/AppBarMenu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                transactions={transactions}
                fetchTransactions={fetchTransactions}
                setEditTransactions={setEditTransactions}
                editTransactions={editTransactions}
              />
            }
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
