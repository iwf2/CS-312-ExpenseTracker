
import React from 'react';

//get total
export default function ExpenseTable({ month, expenses }) {
  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

//render the table for expenses
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2>{month}</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Charge Name</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td style={{ textAlign: 'right' }}>{parseFloat(e.amount).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ fontWeight: 'bold' }}>Grand Total</td>
            <td style={{ fontWeight: 'bold', textAlign: 'right' }}>
              {total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
