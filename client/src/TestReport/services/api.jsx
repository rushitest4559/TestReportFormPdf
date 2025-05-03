import axios from "axios";

// Fetch all test reports
export const fetchTestReports = async (
    params,
    updateReports, // this must be a function
    setStatus,
    setLoading,
    setHasMore
) => {
    try {
        setLoading(true);
        const response = await axios.get('/api/testreports', { params });
        const { reports, hasMore } = response.data;

        updateReports((prev) => {
            if (params.page === 1) {
                return reports; // Reset
            } else {
                return [...prev, ...reports]; // Append
            }
        });

        setHasMore(hasMore);
    } catch (err) {
        console.error(err);
        setStatus({ type: 'error', text: 'Failed to fetch test reports' });
    } finally {
        setLoading(false);
    }
};

// Fetch a single test report by ID
export const fetchTestReport = async (id, setFormData, setLoading, setStatus) => {
    setLoading(true)
    try {
        const response = await axios.get(`/api/testreports/${id}`);
        setFormData(response.data);
        setStatus({ type: 'success', text: 'Test report fetched successfully.' });
    } catch (err) {
        setError('Failed to fetch test report details.');
        setStatus({ type: 'error', text: 'Failed to fetch test report details. ' + err.response?.data?.message });
        console.error(err);
    } finally {
        setLoading(false)
    }
};

// Create a new test report
export const createTestReport = async (reportData, setLoading, setStatus, navigate) => {
    // convert to number
    reportData.hardnessSamples = reportData.hardnessSamples.map(sample => ({
        ...sample,
        surfaceHardness: Number(sample.surfaceHardness)
    }));
    console.log("Sending reportData:", reportData);
    setLoading(true)
    try {
        await axios.post('/api/testreports', reportData);
        setStatus({ type: 'success', text: 'Test report created successfully.' });
        navigate('/dashboard');
    } catch (err) {
        setStatus({ type: 'error', text: 'Failed to create test report. ' + err.response?.data?.message });
        console.error(err);
    } finally {
        setLoading(false)
    }
};

// Update an existing test report
export const updateTestReport = async (id, updatedData, setStatus, setLoading, navigate) => {
    setLoading(true)
    updatedData.hardnessSamples = updatedData.hardnessSamples.map(sample => ({
        ...sample,
        surfaceHardness: Number(sample.surfaceHardness)
    }));

    try {
        await axios.put(`/api/testreports/${id}`, updatedData);
        setStatus({ type: 'success', text: 'Test report updated successfully.' });
        navigate('/');
    } catch (err) {
        setStatus({ type: 'error', text: 'Failed to update test report. ' + err.response?.data?.message });
        console.error(err);
    } finally {
        setLoading(false)
    }
};

// Delete a test report
export const deleteTestReport = async (id, setDeletingId, setReports, setStatus) => {
    setDeletingId(id)
    if (window.confirm('Are you sure you want to delete this test report?')) {
        try {
            await axios.delete(`/api/testreports/${id}`);
            setReports((prev) => prev.filter((r) => r._id !== id));
            setStatus({ type: 'success', text: 'Test report deleted successfully.' });
        } catch (err) {
            setStatus({ type: 'error', text: 'Failed to delete test report. ' + err.response?.data?.message });
            console.error(err);
        } finally {
            setDeletingId(null)
        }
    }
};


export const handleInsertDummyReports = async (setLoading, setStatus) => {
    setLoading(true);
    try {
        const response = await fetch('/api/testreports/insert-dummy-reports', {
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            setStatus({ type: 'success', text: data.message });
        } else {
            throw new Error('Failed to insert dummy reports');
        }
    } catch (error) {
        setStatus({ type: 'error', text: error.message });
    } finally {
        setLoading(false);
    }
};

export const deleteAllTestReports = async (setStatus, setLoading, setTestReports) => {
    try {
        setLoading(true);
        await axios.delete('/api/testreports/delete-all');
        setTestReports([]);
        setStatus({ type: 'success', text: 'All test reports deleted successfully.' });
    } catch (err) {
        console.error(err);
        setStatus({ type: 'error', text: 'Failed to delete all test reports.' });
    } finally {
        setLoading(false);
    }
};
