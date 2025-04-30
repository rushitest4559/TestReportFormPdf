import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './CreateCustomer.css';
import { createCustomer } from '../../../components/functions/admin';

function CreateCustomer() {
  const navigate = useNavigate();

  // Main customer state with name and list of parts
  const [customer, setCustomer] = useState({
    customerName: '',
    parts: [],
  });

  // Current part being added (with parameters)
  const [part, setPart] = useState({
    partName: '',
    material: '',
    parameters: [],
  });

  // Single parameter input for the current part
  const [parameter, setParameter] = useState({
    name: '',
    value: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Generic handler for input changes
  const handleChange = (e, setter, prevState) => {
    setter({ ...prevState, [e.target.name]: e.target.value });
  };

  // Add current parameter to the current part
  const addParameter = () => {
    if (parameter.name && parameter.value) {
      setPart({
        ...part,
        parameters: [...part.parameters, parameter],
      });
      setParameter({ name: '', value: '' });
    }
  };

  // Remove a parameter from the current part
  const removeParameter = (index) => {
    const updated = [...part.parameters];
    updated.splice(index, 1);
    setPart({ ...part, parameters: updated });
  };

  // Add current part to customer
  const addPart = () => {
    if (part.partName && part.material) {
      setCustomer({
        ...customer,
        parts: [...customer.parts, part],
      });
      setPart({ partName: '', material: '', parameters: [] });
    }
  };

  // Remove a part from customer
  const removePart = (index) => {
    const updated = [...customer.parts];
    updated.splice(index, 1);
    setCustomer({ ...customer, parts: updated });
  };

  return (
    <div className="create-customer-container">
      <h2>Create New Customer</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <Link to="/admin/customers">Back to Customers</Link>

      {/* Customer Name Input */}
      <input
        name="customerName"
        placeholder="Customer Name"
        value={customer.customerName}
        onChange={(e) => handleChange(e, setCustomer, customer)}
      />

      <h4>Add New Part</h4>
      {/* Part Name and Material Inputs */}
      <input
        name="partName"
        placeholder="Part Name"
        value={part.partName}
        onChange={(e) => handleChange(e, setPart, part)}
      />
      <input
        name="material"
        placeholder="Material"
        value={part.material}
        onChange={(e) => handleChange(e, setPart, part)}
      />

      <h5>Add Parameter to Part</h5>
      {/* Parameter Name and Value Inputs */}
      <input
        name="name"
        placeholder="Parameter Name"
        value={parameter.name}
        onChange={(e) => handleChange(e, setParameter, parameter)}
      />
      <input
        name="value"
        placeholder="Specified Value"
        value={parameter.value}
        onChange={(e) => handleChange(e, setParameter, parameter)}
      />
      <button type="button" onClick={addParameter}>Add Parameter</button>

      {/* List of current parameters in the part */}
      {part.parameters.map((param, index) => (
        <div key={index}>
          {param.name}: {param.value}
          <button type="button" onClick={() => removeParameter(index)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={addPart}>Add Part to Customer</button>

      {/* List of parts in the customer */}
      <h4>New Customer Parts:</h4>
      <ul>
        {customer.parts.map((p, idx) => (
          <li key={idx}>
            {p.partName} ({p.material}) - Parameters:
            <ul>
              {p.parameters.map((param, i) => (
                <li key={i}>{param.name}: {param.value}</li>
              ))}
            </ul>
            <button type="button" onClick={() => removePart(idx)}>Remove Part</button>
          </li>
        ))}
      </ul>

      <button onClick={()=>createCustomer(customer, setMessage, setError, navigate)}>Create Customer</button>
    </div>
  );
}

export default CreateCustomer;
