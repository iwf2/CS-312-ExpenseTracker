// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm   from './components/ExpenseForm';
import CategoryForm from './components/CategoryForm';
import ExpenseTable  from './components/ExpenseTable';

function App() {
  const [grouped, setGrouped] = useState({});

  // Fetch expenses and group by month
  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses');
      const groups = {};
      res.data.forEach(e => {
        const m = new Date(e.date)
                  .toLocaleString('default', { month: 'long', year: 'numeric' });
        groups[m] = groups[m] ? [...groups[m], e] : [e];
      });
      setGrouped(groups);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  // Call fetchExpenses inside useEffect so it doesn't return a Promise
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Expense Tracker</h1>
      <CategoryForm />
      <ExpenseForm onAdd={fetchExpenses} />
      {Object.entries(grouped).map(([month, items]) => (
        <ExpenseTable key={month} month={month} expenses={items} />
      ))}
    </div>
  );
}

export default App;
