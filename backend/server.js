
require('util')._extend = Object.assign;
const express = require('express');
const cors    = require('cors');
const db      = require('./db');
require('dotenv').config();

const app = express();
app.use(cors(), express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API listening on ${port}`));

//make table if not alr made
db.query(`
  CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    date DATE NOT NULL
  );
`).catch(console.error);

//get expenses 
app.get('/api/expenses', async (req, res) => {
  const result = await db.query('SELECT * FROM expenses ORDER BY date');
  res.json(result.rows);
});


//get categories 
app.get('/api/categories', async (req, res) => {
  const result = await db.query('SELECT * FROM categories ORDER BY name');
  res.json(result.rows);
});

//create category
app.post('/api/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  //ad to db
  const result = await db.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

//new expense

app.post('/api/expenses', async (req, res) => {
  const { name, amount, date, category_id, description } = req.body;

  //require all fields
  if (!name || !amount || !date || !category_id) {
    return res
      .status(400)
      .json({ error: 'name, amount, date & category_id are required.' });
  }

  //add to db
  const result = await db.query(
    `INSERT INTO expenses (name, amount, date, category_id, description)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [name, amount, date, category_id, description || null]
  );
  res.status(201).json(result.rows[0]);
});
