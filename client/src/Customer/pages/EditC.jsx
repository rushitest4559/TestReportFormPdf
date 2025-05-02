import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchCustomer, updateCustomer } from '../services/api';

function EditC() {
    const [editFormData, setEditFormData] = useState({ customerName: '', parts: [] });
    const [currentEdit, setCurrentEdit] = useState({ index: null, part: null });
    const [paramInput, setParamInput] = useState({ name: '', specified: '' });

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [status, setStatus] = useState({ type: null, text: '' })

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCustomer(id, setEditFormData, setStatus, setLoading1);
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePartEdit = (index) => {
        setCurrentEdit({ index, part: { ...editFormData.parts[index] } });
    };

    const handlePartChange = (e) => {
        const { name, value } = e.target;
        setCurrentEdit((prev) => ({
            ...prev,
            part: { ...prev.part, [name]: value }
        }));
    };

    const handleParamChange = (e) => {
        const { name, value } = e.target;
        setParamInput((prev) => ({ ...prev, [name]: value }));
    };


    const addParameter = () => {
        const { name, specified } = paramInput;
        if (name && specified && currentEdit.part) {
            const updatedParams = [...(currentEdit.part.parameters || []), { name, specified }];
            setCurrentEdit((prev) => ({
                ...prev,
                part: { ...prev.part, parameters: updatedParams }
            }));
            setParamInput({ name: '', specified: '' });
        }
    };


    const removeParameter = (paramIndex) => {
        const updatedParams = currentEdit.part.parameters.filter((_, i) => i !== paramIndex);
        setCurrentEdit((prev) => ({
            ...prev,
            part: { ...prev.part, parameters: updatedParams }
        }));
    };

    const savePart = () => {
        const updatedParts = [...editFormData.parts];
        updatedParts[currentEdit.index] = currentEdit.part;
        setEditFormData((prev) => ({ ...prev, parts: updatedParts }));
        setCurrentEdit({ index: null, part: null });
    };

    const addPart = () => {
        setEditFormData((prev) => ({
            ...prev,
            parts: [...prev.parts, { partName: '', material: '', parameters: [] }]
        }));
    };

    const removePart = (index) => {
        const updatedParts = editFormData.parts.filter((_, i) => i !== index);
        setEditFormData((prev) => ({ ...prev, parts: updatedParts }));
    };

    return (
        <div className="create-customer-container" style={{ marginBottom: '200px' }}>
            <h2>Edit Customer</h2>

            {loading1 ? 'Loading customer data' : ''}

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

            <Link to="/admin/customers"><button className='add-btn'> Back to Customers</button></Link><br /><br />

            <input
                name="customerName"
                value={editFormData.customer}
                onChange={handleInputChange}
                placeholder="Customer Name"
            />

            <h4>Parts</h4>
            <ul>
                {editFormData.parts.map((part, index) => (
                    <li key={index}>
                        {part.partName} ({part.material})
                        <button className='add-btn' type="button" onClick={() => handlePartEdit(index)}>Edit</button>
                        <button className='add-btn' type="button" onClick={() => removePart(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <button className='add-btn' type="button" onClick={addPart}>Add New Part</button>

            {currentEdit.part && (
                <div>
                    <h3>Edit Part</h3>
                    <input
                        name="partName"
                        value={currentEdit.part.partName}
                        onChange={handlePartChange}
                        placeholder="Part Name"
                    />
                    <input
                        name="material"
                        value={currentEdit.part.material}
                        onChange={handlePartChange}
                        placeholder="Material"
                    />

                    <h4>Parameters</h4>
                    <ul>
                        {currentEdit.part.parameters?.map((param, i) => (
                            <li key={i}>
                                {param.name}: {param.specified}
                                <button className='delete-btn' type="button" onClick={() => removeParameter(i)}>Remove</button>
                            </li>
                        ))}
                    </ul>


                    <input
                        name="name"
                        value={paramInput.name}
                        onChange={handleParamChange}
                        placeholder="Parameter Name"
                    />
                    <input
                        name="specified"
                        value={paramInput.specified}
                        onChange={handleParamChange}
                        placeholder="Parameter Value"
                    />

                    <button className='add-btn' type="button" onClick={addParameter}>Add Parameter</button>

                    <button className='add-btn' type="button" onClick={savePart}>Save Part</button>
                </div>
            )}

            <br /><br /><br /><br />
            <button className='submit-btn'
                onClick={() => updateCustomer(id, editFormData, setStatus, setLoading2, navigate)}>
                {loading2 ? 'saving...' : 'Save Customer'}

            </button>
        </div>
    );
}

export default EditC;
