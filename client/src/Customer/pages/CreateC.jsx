import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { createCustomer } from '../services/api';

import '../css/create.css'

function CreateC() {
    const navigate = useNavigate();

    // Main customer state with name and list of parts
    const [customer, setCustomer] = useState({
        customer: '',
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
        specified: '',
    });


    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({ type: null, text: '' })

    // Generic handler for input changes
    const handleChange = (e, setter, prevState) => {
        setter({ ...prevState, [e.target.name]: e.target.value });
    };

    // Add current parameter to the current part
    const addParameter = () => {
        if (parameter.name && parameter.specified) {
            setPart({
                ...part,
                parameters: [...part.parameters, parameter],
            });
            setParameter({ name: '', specified: '' });
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

            <Link to="/admin/customers"><button className='add-btn'>Back to Customers</button></Link>
            <br /><br />

            {/* Customer Name Input */}
            <input
                name="customer"
                placeholder="Customer Name"
                value={customer.customer}
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
                name="specified"
                placeholder="Specified Value"
                value={parameter.specified}
                onChange={(e) => handleChange(e, setParameter, parameter)}
            />

            <button type="button" className='add-btn' onClick={addParameter}>Add Parameter</button>

            {/* List of current parameters in the part */}
            {part.parameters.map((param, index) => (
                <div key={index}>
                    {param.name}: {param.specified}
                    <button className='delete-btn' type="button" onClick={() => removeParameter(index)}>Remove</button>
                </div>
            ))}


            <br /><br /><br /><br />
            <button type="button" className='add-btn' onClick={addPart}>Add Part to Customer</button>

            {/* List of parts in the customer */}
            <h4>New Customer Parts:</h4>
            <ul>
                {customer.parts.map((p, idx) => (
                    <li key={idx}>
                        {p.partName} ({p.material}) - Parameters:
                        <ul>
                            {p.parameters.map((param, i) => (
                                <li key={i}>{param.name}: {param.specified}</li>
                            ))}

                        </ul>
                        <button className='delete-btn' type="button" onClick={() => removePart(idx)}>Remove Part</button>
                    </li>
                ))}
            </ul>

            <button className='submit-btn' onClick={() => createCustomer(customer, setStatus, setLoading, navigate)}>
                {loading ? 'Creating...' : 'Create Customer'}
            </button>
        </div>
    );
}

export default CreateC;
