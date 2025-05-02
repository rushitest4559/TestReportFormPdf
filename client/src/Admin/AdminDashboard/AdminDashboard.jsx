import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminDashboard.css'; // Optional styling

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('customers');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-navigation">
        <Link to="/admin/customers">
          <button
            className={`submit-btn ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => handleTabChange('customers')}
          >
            Manage Customers
          </button>
        </Link>
        <Link to="/admin/users">
          <button
            className={`submit-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabChange('users')}
          >
            Manage Users
          </button>
        </Link>
        <Link to='/'>
        <button className='submit-btn'>Home</button>
        </Link>
        {/* Add more navigation links for other admin tasks */}
      </div>

      <div className="admin-content">
        <Outlet /> {/* This is where the content of the nested routes will be rendered */}
      </div>
    </div>
  );
}

export default AdminDashboard;