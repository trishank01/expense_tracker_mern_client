import  { useEffect, useState } from "react"
import './App.css';

function App() {
  const [form, setForm] = useState({
    amount : 0,
    description: "",
    date : ""
  })
  const [formSubmit, setFormSubmit] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmit([...formSubmit , form])
     await fetch("http://localhost:4000/transaction" , {
      method : "POST",
      body : JSON.stringify(form),
      headers : {
        'content-type' : "application/json",
      }
    })


    setForm({
      amount : 0,
      description: "",
      date : ""
    })
  }

  const handleInput = (e) => {
       setForm({...form , [e.target.name]:e.target.value})

  }
 
  useEffect(() => {
    fetchTransactions()
  })

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:4000/transaction")
    const {data} = await res.json()
    console.log(data)

  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="number" name="amount" value={form.amount} placeholder="Enter transaction amount" onChange={handleInput}/>
        <input type="text" name="description" value={form.description} placeholder="Enter transaction details" onChange={handleInput}/>
        <input type="date"  name="date" value={form.date} onChange={handleInput}/>
        <button type="submit">Submit</button>
    </form>
    <br/>
    <table>
      <thead>
        <th>Amount</th>
        <th>Description</th>
        <th>Date</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>sddsf</td>
          <td>23432</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}

export default App;
