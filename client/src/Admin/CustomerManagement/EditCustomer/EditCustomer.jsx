import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchCustomer, updateCustomer } from '../../../components/functions/admin';

function EditCustomer() {
  const [editFormData, setEditFormData] = useState({ customerName: '', parts: [] });
  const [currentEdit, setCurrentEdit] = useState({ index: null, part: null });
  const [paramInput, setParamInput] = useState({ name: '', value: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCustomer(id, setEditFormData, setError);
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
    const { name, value } = paramInput;
    if (name && value && currentEdit.part) {
      const updatedParams = [...(currentEdit.part.parameters || []), { name, value }];
      setCurrentEdit((prev) => ({
        ...prev,
        part: { ...prev.part, parameters: updatedParams }
      }));
      setParamInput({ name: '', value: '' });
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
    <div style={{ marginBottom: '200px' }}>
      <h2>Edit Customer</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <Link to="/admin/customers">Back to Customers</Link>

      <input
        name="customerName"
        value={editFormData.customerName}
        onChange={handleInputChange}
        placeholder="Customer Name"
      />

      <h4>Parts</h4>
      <ul>
        {editFormData.parts.map((part, index) => (
          <li key={index}>
            {part.partName} ({part.material})
            <button type="button" onClick={() => handlePartEdit(index)}>Edit</button>
            <button type="button" onClick={() => removePart(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={addPart}>Add New Part</button>

      {currentEdit.part && (
        <div>
          <h5>Edit Part</h5>
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

          <h6>Parameters</h6>
          <ul>
            {currentEdit.part.parameters?.map((param, i) => (
              <li key={i}>
                {param.name}: {param.value}
                <button type="button" onClick={() => removeParameter(i)}>Remove</button>
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
            name="value"
            value={paramInput.value}
            onChange={handleParamChange}
            placeholder="Parameter Value"
          />
          <button type="button" onClick={addParameter}>Add Parameter</button>

          <button type="button" onClick={savePart}>Save Part</button>
        </div>
      )}

      <button onClick={()=>updateCustomer(id, editFormData, setMessage, setError, navigate)}>Save Customer</button>
    </div>
  );
}

export default EditCustomer;
