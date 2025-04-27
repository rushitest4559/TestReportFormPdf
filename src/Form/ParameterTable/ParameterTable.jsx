import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Reuse the same CSS
import { useFormContext } from '../../context/FormContext';

const ParameterTable = () => {
  const [rows, setRows] = useState([]);

  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("parameterTable", rows); // Save rows in context under key "parameterTable"
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { parameter: '', specified: '', actual: '' }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  return (
    <div className="partnoqty-container">
      <h2 className="partnoqty-title">Extra Parameter Table</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Parameter</th>
              <th className="partnoqty-header">Specified</th>
              <th className="partnoqty-header">Actual</th>
              <th className="partnoqty-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.parameter}
                    onChange={(e) => handleInputChange(index, 'parameter', e.target.value)}
                    className="core-hardness-input"
                    placeholder="Enter Parameter"
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.specified}
                    onChange={(e) => handleInputChange(index, 'specified', e.target.value)}
                    className="core-hardness-input"
                    placeholder="Enter Specified"
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.actual}
                    onChange={(e) => handleInputChange(index, 'actual', e.target.value)}
                    className="core-hardness-input"
                    placeholder="Enter Actual"
                  />
                </td>
                <td className="partnoqty-cell">
                  <button
                    onClick={() => handleDeleteRow(index)}
                    className="partnoqty-delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow} className="partnoqty-add-button">
        Add Parameter
      </button>
    </div>
  );
};

export default ParameterTable;
