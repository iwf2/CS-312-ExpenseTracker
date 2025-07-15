
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '', amount: '', date: '', category_id: '', description: ''
  });
  const [categories, setCategories] = useState([]);

  // fetch category 
  useEffect(() => {
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  //any input change
  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //when form submitted 
  const handleSubmit = async event => {
    event.preventDefault();
    const payload = { ...form };
    //check to see if any prelaodable data (if you refresh to have your category show up it will keep your the info you attempted type in)
    try {
      const { data } = await axios.post('/api/expenses', payload);
      onAdd(data);
      // let parent update if possible
      setForm({ name:'', amount:'', date:'', category_id:'', description:'' });
    } 
    //error
    catch (err) {
      alert(err.response?.data?.error || 'Failed to add expense');
    }
  };

  //render form
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        name="name" placeholder="Charge name"
        value={form.name} onChange={handleChange} required
      />
      <input
        name="amount" type="number" step="0.01" placeholder="Amount"
        value={form.amount} onChange={handleChange} required
      />
      <input
        name="date" type="date"
        value={form.date} onChange={handleChange} required
      />

      <select
        name="category_id" value={form.category_id}
        onChange={handleChange} required
      >
        <option value="" disabled>— Select category —</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        name="description" placeholder="Description (optional)"
        value={form.description} onChange={handleChange}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}
