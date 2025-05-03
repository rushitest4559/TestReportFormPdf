import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { deleteAllTestReports, deleteTestReport, fetchTestReports, handleInsertDummyReports } from '../services/api';
import FilterBar from '../components/FilterBar';
import { customerChange, materialChange, partNameChange } from '../services/suggesstions';
import { handleCreatePDF } from '../services/Fetch';

const Dashboard = () => {
  // States for storing reports, loading status, filter settings, and suggestions
  const [testReports, setTestReports] = useState([]);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [deletingId, setDeletingId] = useState(null);
  const [loadingpdfId, setLoadingPdfId] = useState(null)
  const [hasMore, setHasMore] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [applyFilLoading, setApplyFilLoading] = useState(false)
  const [removeFilLoading, setRemoveFilLoading] = useState(false)

    const [dummyLoading, setDummyLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false)


  // Filter settings for customer, partName, material, date range
  const [filters, setFilters] = useState({
    customer: '',
    partName: '',
    material: '',
    startDate: '',
    endDate: '',
    page: 1,  // Start at page 1
    limit: 5, // Limit of 5 reports per request
  });

  // Suggestions for auto-completion of fields
  const [suggestions, setSuggestions] = useState({
    customer: [],
    partName: [],
    material: [],
  });

  // Handles the input change for filtering and fetches suggestions
  const handleSuggestionInput = (field, event) => {
    const value = event.target.value;

    // Update the filter value
    setFilters((prev) => ({ ...prev, [field]: value }));

    // Fetch suggestions based on the field
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

  // Applies filters and fetches reports
  const handleApplyFilters = () => {
    // Fetch reports based on the current filters
    console.log('Applying filters:', filters);
    fetchTestReports({ ...filters, page: 1, limit: 5 }, setTestReports, setStatus, setApplyFilLoading, setHasMore);
  };

  // Resets the filters and fetches all reports
  const handleResetFilters = () => {
    setFilters({
      customer: '',
      partName: '',
      material: '',
      startDate: '',
      endDate: '',
      page: 1, // Reset to page 1
      limit: 5,
    });
    setSuggestions({ customer: [], partName: [], material: [] });
    fetchTestReports({ page: 1, limit: 5 }, setTestReports, setStatus, setRemoveFilLoading, setHasMore);
  };

  // Fetch test reports on component mount or when filters change
  useEffect(() => {
    setInitialLoading(true);
    fetchTestReports(
      { ...filters, page: 1, limit: 5 },
      setTestReports,
      setStatus,
      setInitialLoading,
      setHasMore
    );
  }, []);


  // Function to handle "Load More" button click, incrementing the page
  const handleLoadMore = () => {
    if (hasMore) {
      setLoadMoreLoading(true);
      const nextPage = filters.page + 1;

      fetchTestReports(
        { ...filters, page: nextPage, limit: filters.limit },
        setTestReports, // this now works because fetchTestReports expects a function
        setStatus,
        setLoadMoreLoading,
        setHasMore
      );
      setFilters((prev) => ({ ...prev, page: nextPage })); // update filter state
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
      setHasMore
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Test Reports</h2>

      {initialLoading && <p>Loading...</p>}


      <Link to='/create'>
        <button className='submit-btn'>Create New TestReport</button>
      </Link>

      {/* Displaying the status message if there's any */}
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

      {/* Filter Bar Component */}
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

      {/* Table for desktop view */}
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
                  {/* Edit Button */}
                  <Link to={`/edit/${report._id}`}>
                    <button className="add-btn">Edit</button>
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      deleteTestReport(report._id, setDeletingId, setTestReports, setStatus)
                    }
                    className="delete-btn"
                  >
                    {deletingId === report._id ? 'Deleting...' : 'Delete'}
                  </button>
                  {/* pdf */}
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

      {/* Mobile View for reports */}
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


      {/* Button to insert 1000 dummy reports */}
      <button onClick={handleInsert} className="submit-btn" disabled={dummyLoading}>
        {dummyLoading ? 'Inserting...' : 'Insert 1000 Dummy Test Reports'}
      </button>

      {/* Button to delete all test reports */}
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
