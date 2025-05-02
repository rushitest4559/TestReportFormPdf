import axios from "axios";

export const customerChange = async (event, setSuggestions) => {
    const newValue = event.target.value;

    if (newValue.length >= 2) {
        try {
            const response = await axios.get(`/api/customers/suggestions?q=${newValue}`);
            setSuggestions(response.data); // assuming it returns an array of names
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    } else {
        setSuggestions([]);
    }
};

export const partNameChange = async (event, setPartSuggestions, customer) => {
    const newValue = event.target.value;

    if (newValue.length >= 2) {
        try {
            const response = await axios.get('/api/customers/part-suggestions', {
                params: { q: newValue, customer: customer }
            });
            setPartSuggestions(response.data);
        } catch (err) {
            console.error('Error fetching part name suggestions:', err);
        }
    } else {
        setPartSuggestions([]);
    }
};

// Function to handle Material input change
export const materialChange = async (event, setMaterialSuggestions, customer) => {
    const newValue = event.target.value;

    if (newValue.length >= 2) {
        try {
            const response = await axios.get('/api/customers/material-suggestions', {
                params: { q: newValue, customer: customer }
            });
            setMaterialSuggestions(response.data);
        } catch (err) {
            console.error('Error fetching material suggestions:', err);
        }
    } else {
        setMaterialSuggestions([]);
    }
};