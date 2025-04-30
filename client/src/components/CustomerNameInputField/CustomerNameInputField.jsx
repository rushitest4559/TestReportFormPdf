import { useState } from 'react';
import './CustomerNameInputField.css';
import { useFormContext } from '../../context/FormContext';
import axios from 'axios';
import { customerChange } from '../functions/suggestions';

const CustomerNameInputField = () => {
  const { reportData, updateField } = useFormContext();
  const [suggestions, setSuggestions] = useState([]);

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
        onChange={(e)=>customerChange(e, updateField, setSuggestions)}
        name="customer"
        autoComplete="off"
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
