import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { deleteTestReport, fetchTestReports } from '../services/api';

const Dashboard = () => {
  const [testReports, setTestReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });

  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchTestReports(setTestReports, setStatus, setLoading)
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Test Reports</h2>

      <Link to='/create'><button className='submit-btn'>Create New TestReport</button></Link>
      <Link to='/admin' ><button className='delete-btn'>Admin</button></Link>

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
              <th>Part Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testReports.map((report) => (
              <tr key={report._id}>
                <td>{report.customer}</td>
                <td>{report.partName}</td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>
                  {/* <button className="submit-btn">View</button> */}
                  <Link to={`/edit/${report._id}`}><button className="add-btn">Edit</button></Link>
                  <button onClick={() => deleteTestReport(report._id, setDeletingId, setTestReports, setStatus)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="mobile-list">
        {testReports.map((report) => (
          <div key={report._id} className="mobile-card">
            <div><strong>Customer:</strong> {report.customer}</div>
            <div><strong>Part Name:</strong> {report.partName}</div>
            <div><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</div>
            {/* <button className="submit-btn">View</button> */}
            <Link to={`/edit/${report._id}`}><button className="add-btn">Edit</button></Link>
            <button onClick={() => deleteTestReport(report._id, setDeletingId, setTestReports, setStatus)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
