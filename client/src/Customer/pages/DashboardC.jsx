import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCustomer, fetchCustomers } from '../services/api';

const DashboardC = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: null, text: '' });

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        fetchCustomers(setCustomers, setStatus, setLoading)
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Customers</h2>

            <Link to='/admin/customers/create'><button className='submit-btn'>Create New Customer</button></Link>

            {loading && <p>Loading...</p>}
            {status.text && (
                <div
                    style={{
                        padding: '10px',
                        backgroundColor:
                            status.type === 'success'
                                ? '#d4edda'
                                : status.type === 'error'
                                    ? '#f8d7da'
                                    : '#fff3cd',
                        color:
                            status.type === 'success'
                                ? '#155724'
                                : status.type === 'error'
                                    ? '#721c24'
                                    : '#856404',
                        border: '1px solid',
                        borderColor:
                            status.type === 'success'
                                ? '#c3e6cb'
                                : status.type === 'error'
                                    ? '#f5c6cb'
                                    : '#ffeeba',
                        borderRadius: '4px',
                        marginBottom: '16px',
                        textAlign: 'center',
                    }}
                >
                    {status.text}
                </div>
            )}

            {/* Desktop Table */}
            <div className="table-container">
                <table className="desktop-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Part Names</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td>{customer.customer}</td>
                                <td>
                                    <ul>
                                        {customer.parts.map((part, index) => (
                                            <li key={index}>
                                                {part.partName} ({part.material})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="submit-btn">View</button>
                                    <Link to={`/admin/customers/edit/${customer._id}`}><button className="add-btn">Edit</button></Link>
                                    <button onClick={() => deleteCustomer(customer._id, setDeletingId, setCustomers, setStatus)} className="delete-btn">
                                        {customer._id === deletingId ? 'Deleteing...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="mobile-list">
                {customers.map((customer) => (
                    <div key={customer._id} className="mobile-card">
                        <div><strong>Customer:</strong> {customer.customer}</div>
                        <div><strong>Part Name:</strong>
                            <ul>
                                {customer.parts.map((part, index) => (
                                    <li key={index}>
                                        {part.partName} ({part.material})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <strong>Created At:</strong> {new Date(customer.createdAt).toLocaleDateString()
                        }</div>
                        <Link to={`/admin/customers/edit/${customer._id}`}><button className="add-btn">Edit</button></Link>
                        <button onClick={() => deleteCustomer(customer._id, setDeletingId, setCustomers, setStatus)} className="delete-btn">
                            {customer._id === deletingId ? 'Deleteing...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardC;
