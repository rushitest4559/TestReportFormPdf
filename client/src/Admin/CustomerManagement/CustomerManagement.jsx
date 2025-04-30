import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchCustomers, deleteCustomer } from '../../components/functions/admin';

import './CustomerManagement.css'

function CustomersDashboard() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers(setCustomers, setError);
  }, []);

  return (
    <div  className="customers-dashboard">
      <h2>Customers Dashboard</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <button><Link to="/admin/customers/create">Create New Customer</Link></button>

      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Parts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.customerName}</td>
              <td>
                <ul>
                  {customer.parts.map((part, index) => (
                    <li key={index}>
                      {part.partName} ({part.material}) - Parameters:
                      <ul>
                        {part.parameters.map((param, i) => (
                          <li key={i}>{param.name}: {param.value}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/admin/customers/edit/${customer._id}`}>Edit</Link>
                <button onClick={() => deleteCustomer(customer._id, customers, setCustomers, setMessage, setError)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersDashboard;