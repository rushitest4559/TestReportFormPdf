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
        <button
          className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => handleTabChange('customers')}
        >
          <Link to="/admin/customers">Manage Customers</Link>
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => handleTabChange('users')}
        >
          <Link to="/admin/users">Manage Users</Link>
        </button>
        {/* Add more navigation links for other admin tasks */}
      </div>

      <div className="admin-content">
        <Outlet /> {/* This is where the content of the nested routes will be rendered */}
      </div>
    </div>
  );
}

export default AdminDashboard;