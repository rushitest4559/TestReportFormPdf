import axios from "axios";

export const fetchCustomers = async (setCustomers, setStatus, setLoading) => {
    setLoading(true)
    try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        setCustomers(Array.isArray(data) ? data : []);
        setStatus({ type: 'success', text: 'Customers Fetched successfully!' });
    } catch (err) {
        setStatus({ type: 'error', text: 'Failed to fetch Customers. ' + err.response?.data?.message });
        console.error(err);
    } finally {
        setLoading(false)
    }
};

export const deleteCustomer = async (id, setDeletingId, setCustomers, setStatus) => {
    setDeletingId(id)
    if (window.confirm('Are you sure you want to delete this customer?')) {
        try {
            await axios.delete(`/api/customers/${id}`);
            setCustomers((prev) => prev.filter((r) => r._id !== id));
            setStatus({type: 'success', text: 'Customer deleted successfully.'});
        } catch (err) {
            setStatus({type: 'error', text: 'Failed to delete Customer. '+err.response?.data?.message});
            console.error(err);
        } finally {
            setDeletingId(null)
        }
    }
};

export const createCustomer = async (customer, setStatus, setLoading, navigate) => {
    setLoading(true)
    try {
        await axios.post('/api/customers', customer);
        setStatus({type: 'success', text: 'Customer created successfully.'});
        navigate('/admin/customers');
    } catch (err) {
        setStatus({type: 'error', text: 'failed to create customer. '+ err.response?.data?.message});
        console.error(err);
    } finally {
        setLoading(false)
    }
};

export const updateCustomer = async (id, editFormData, setStatus, setLoading2, navigate) => {
    setLoading2(true)
    try {
        await axios.put(`/api/customers/${id}`, editFormData);
        setStatus({type: 'success', text: 'Customer updated successfully.'});
        navigate('/admin/customers');
    } catch (err) {
        setStatus({type: 'error', text: 'Failed to update customer. '+err.response?.data?.message});
        console.error(err);
    } finally {
        setLoading2(false)
    }
};

export const fetchCustomer = async (id, setEditFormData, setStatus, setLoading) => {
    setLoading(true)
    try {
        const response = await axios.get(`/api/customers/${id}`);
        setEditFormData(response.data);
        setStatus({type: 'success', text: 'Customer fetched successfully.'});
    } catch (err) {
        setStatus({type: 'success', text: 'Failed to fetch customer details.'+err.response?.data?.message});
        console.error(err);
    } finally {
        setLoading(false)
    }
};