import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { deleteAllTestReports, deleteTestReport, fetchTestReports, handleInsertDummyReports } from '../services/api';
import FilterBar from '../components/FilterBar';
import { customerChange, materialChange, partNameChange } from '../services/suggesstions';
import { handleCreatePDF } from '../services/Fetch';

const Dashboard = () => {
  const [testReports, setTestReports] = useState([]);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [deletingId, setDeletingId] = useState(null);
  const [loadingpdfId, setLoadingPdfId] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [applyFilLoading, setApplyFilLoading] = useState(false);
  const [removeFilLoading, setRemoveFilLoading] = useState(false);
  const [dummyLoading, setDummyLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);

  const [filters, setFilters] = useState({
    customer: '',
    partName: '',
    material: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 5,
  });

  const [suggestions, setSuggestions] = useState({
    customer: [],
    partName: [],
    material: [],
  });

  const [summary, setSummary] = useState({
    totalReports: 0,
    uniqueCustomers: 0,
    uniqueParts: 0,
    totalMaterials: 0,
  });

  const handleSuggestionInput = (field, event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (field === 'customer') {
      customerChange(event, (data) =>
        setSuggestions((prev) => ({ ...prev, customer: data }))
      );
    } else if (field === 'partName') {
      partNameChange(event, (data) =>
        setSuggestions((prev) => ({ ...prev, partName: data })),
        filters.customer
      );
    } else if (field === 'material') {
      materialChange(event, (data) =>
        setSuggestions((prev) => ({ ...prev, material: data })),
        filters.customer,
        filters.partName
      );
    }
  };

  const handleApplyFilters = () => {
    fetchTestReports({ ...filters, page: 1, limit: 5 }, setTestReports, setStatus, setApplyFilLoading, setHasMore, setSummary);
  };

  const handleResetFilters = () => {
    setFilters({
      customer: '',
      partName: '',
      material: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 5,
    });
    setSuggestions({ customer: [], partName: [], material: [] });
    fetchTestReports({ page: 1, limit: 5 }, setTestReports, setStatus, setRemoveFilLoading, setHasMore, setSummary);
  };

  useEffect(() => {
    setInitialLoading(true);
    fetchTestReports(
      { ...filters, page: 1, limit: 5 },
      setTestReports,
      setStatus,
      setInitialLoading,
      setHasMore,
      setSummary
    );
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      setLoadMoreLoading(true);
      const nextPage = filters.page + 1;
      fetchTestReports(
        { ...filters, page: nextPage, limit: filters.limit },
        setTestReports,
        setStatus,
        setLoadMoreLoading,
        setHasMore,
        setSummary
      );
      setFilters((prev) => ({ ...prev, page: nextPage }));
    }
  };

  const handleInsert = () => {
    setDummyLoading(true);
    handleInsertDummyReports(setDummyLoading, setStatus);
    setInitialLoading(true);
    fetchTestReports(
      { ...filters, page: 1, limit: 5 },
      setTestReports,
      setStatus,
      setInitialLoading,
      setHasMore,
      setSummary
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Test Reports Dashboard</h2>

      {initialLoading && <p>Loading...</p>}

      <Link to='/create'>
        <button className='submit-btn'>Create New Test Report</button>
      </Link>

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

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#f4a261', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>{summary.totalReports}</h3>
          <p style={{ margin: '10px 0 20px', fontSize: '1.2rem' }}>Total Reports</p>
          <Link to="/reports" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>MORE INFO ➔</Link>
        </div>
        <div style={{ backgroundColor: '#2a9d8f', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>{summary.uniqueCustomers}</h3>
          <p style={{ margin: '10px 0 20px', fontSize: '1.2rem' }}>Customers</p>
          <Link to="/customers" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>MORE INFO ➔</Link>
        </div>
        <div style={{ backgroundColor: '#219ebc', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>{summary.uniqueParts}</h3>
          <p style={{ margin: '10px 0 20px', fontSize: '1.2rem' }}>Parts</p>
          <Link to="/parts" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>MORE INFO ➔</Link>
        </div>
        <div style={{ backgroundColor: '#e76f51', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>{summary.totalMaterials}</h3>
          <p style={{ margin: '10px 0 20px', fontSize: '1.2rem' }}>Materials</p>
          <Link to="/materials" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>MORE INFO ➔</Link>
        </div>
      </div>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        onInputChange={handleSuggestionInput}
        loading1={applyFilLoading}
        loading2={removeFilLoading}
      />

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
                  <Link to={`/edit/${report._id}`}>
                    <button className="add-btn">Edit</button>
                  </Link>
                  <button
                    onClick={() =>
                      deleteTestReport(report._id, setDeletingId, setTestReports, setStatus)
                    }
                    className="delete-btn"
                  >
                    {deletingId === report._id ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    onClick={() => handleCreatePDF(report._id, setLoadingPdfId)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "8px"
                    }}
                  >
                    {loadingpdfId === report._id ? 'Creating...' : 'Create PDF'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-list">
        {testReports.map((report) => (
          <div key={report._id} className="mobile-card">
            <div><strong>Customer:</strong> {report.customer}</div>
            <div><strong>Part Name:</strong> {report.partName}</div>
            <div><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</div>
            <Link to={`/edit/${report._id}`}>
              <button className="add-btn">Edit</button>
            </Link>
            <button
              onClick={() =>
                deleteTestReport(report._id, setDeletingId, setTestReports, setStatus)
              }
              className="delete-btn"
            >
              {deletingId === report._id ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={() => handleCreatePDF(report._id, setLoadingPdfId)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "8px"
              }}
            >
              {loadingpdfId === report._id ? 'Creating...' : 'Create PDF'}
            </button>
          </div>
        ))}
      </div>

      {hasMore && !initialLoading && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="add-btn" disabled={loadMoreLoading}>
            {loadMoreLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <button onClick={handleInsert} className="submit-btn" disabled={dummyLoading}>
        {dummyLoading ? 'Inserting...' : 'Insert 1000 Dummy Test Reports'}
      </button>

      <button
        onClick={() => deleteAllTestReports(setStatus, setDeleteAllLoading, setTestReports)}
        className="delete-btn"
        disabled={deleteAllLoading}
      >
        {deleteAllLoading ? 'Deleting...' : 'Delete All Test Reports'}
      </button>
    </div>
  );
};

export default Dashboard;