import axios from "axios";

export const customerChange = async (event, updateField, setSuggestions) => {
    const newValue = event.target.value;
    updateField('customer', newValue);

    if (newValue.length >= 2) {
        try {
            const response = await axios.get(`/api/customers/suggestions?q=${newValue}`);
            setSuggestions(response.data); // assuming it returns an array of names
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    } else {
        setSuggestions([]);
    }
};

export const partNameChange = async (event, updateField, setPartSuggestions) => {
    const newValue = event.target.value;
    updateField('partName', newValue);

    if (newValue.length >= 2) {
        try {
            const response = await axios.get(`/api/customers/part-suggestions?q=${newValue}`);
            setPartSuggestions(response.data);
        } catch (err) {
            console.error('Error fetching part name suggestions:', err);
        }
    } else {
        setPartSuggestions([]);
    }
};

// Function to handle Material input change
export const materialChange = async (event, updateField, setMaterialSuggestions) => {
    const newValue = event.target.value;
    updateField('material', newValue);

    if (newValue.length >= 2) {
        try {
            const response = await axios.get(`/api/customers/material-suggestions?q=${newValue}`);
            setMaterialSuggestions(response.data);
        } catch (err) {
            console.error('Error fetching material suggestions:', err);
        }
    } else {
        setMaterialSuggestions([]);
    }
};