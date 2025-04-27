import { useState } from 'react';
import './CustomerNameInputField.css'
import { useFormContext } from '../../context/FormContext';

const CustomerNameInputField = () => {

    const { reportData, updateField } = useFormContext();
    
    const [suggestions, setSuggestions] = useState([]);
    const customerNames = [
        'Gurunanak Transmission Pvt. Ltd',
        'Mangla Industries',
        'Omkar Industries',
        'Shubham Enterprises',
        'S R Auto Parts',
        'Evolvente Technologies',
    ];

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        updateField('customer', newValue);

        if (newValue.length >= 2) {
            const filteredSuggestions = customerNames.filter((name) =>
                name.toLowerCase().startsWith(newValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (selectedSuggestion) => {
        updateField('customer', selectedSuggestion);
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                placeholder="Customer Name: "
                value={reportData.customer || ''}
                onChange={handleInputChange}
                name="customer"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerNameInputField;