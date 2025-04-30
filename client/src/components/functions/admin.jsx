import axios from "axios";


export const fetchCustomers = async (setCustomers, setError) => {
    try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
        setError('Failed to fetch customers.');
        console.error(err);
    }
};

export const deleteCustomer = async (id, customers, setCustomers, setMessage, setError) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
        try {
            await axios.delete(`/api/customers/${id}`);
            setCustomers(customers.filter(cust => cust._id !== id));
            setMessage('Customer deleted successfully.');
            setError('');
        } catch (err) {
            setError('Failed to delete customer.');
            console.error(err);
        }
    }
};

export const createCustomer = async (customer, setMessage, setError, navigate) => {
    try {
        await axios.post('/api/customers', customer);
        setMessage('Customer created successfully.');
        setError('');
        navigate('/admin/customers');
    } catch (err) {
        console.error(err);
        setError('Failed to create customer.');
    }
};

export const updateCustomer = async (id, editFormData, setMessage, setError, navigate) => {
    try {
        await axios.put(`/api/customers/${id}`, editFormData);
        setMessage('Customer updated successfully.');
        setError('');
        navigate('/admin/customers');
    } catch (err) {
        setError('Failed to update customer.');
        console.error(err);
    }
};

export const fetchCustomer = async (id, setEditFormData, setError) => {
    try {
        const response = await axios.get(`/api/customers/${id}`);
        setEditFormData(response.data);
    } catch (err) {
        setError('Failed to fetch customer details.');
        console.error(err);
    }
};