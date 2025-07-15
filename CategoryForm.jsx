

import React, { useState } from 'react';
import axios from 'axios';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  
  //create new category 
  const addCategory = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/categories', { name });
      setFeedback(`Added category "${res.data.name}"`);
      setName('');
    } catch (err) {
      setFeedback(err.response?.data?.error || 'Error adding category');
    }
  };

  //setup categories portion
  return (
    <section style={{ margin: '2rem 0' }}>
      <h2>Setup Categories</h2>
      <form onSubmit={addCategory}>
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="New category"
          required
        />
        <button type="submit">Add</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </section>
  );
}
