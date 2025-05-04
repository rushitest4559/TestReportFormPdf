import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';

const customersData = [
  { srNo: 5, name: "Kap Engg." },
  { srNo: 6, name: "IGW" },
  { srNo: 7, name: "Trimurti Engg." },
  { srNo: 8, name: "Carraro India Pvt. Ltd." }
];

const Customers = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Customers</h2>

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {customersData.map((customer, index) => (
          <div
            key={customer.srNo}
            style={{
              backgroundColor: ['#f4a261', '#2a9d8f', '#219ebc', '#e76f51'][index % 4],
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', margin: '0' }}>{customer.name}</h3>
            <p style={{ margin: '10px 0 20px', fontSize: '1.2rem' }}>Customer</p>
            <Link
              to={`/customers/${customer.srNo}`}
              style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              MORE INFO ➔
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;