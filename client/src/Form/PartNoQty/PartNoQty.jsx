import React, { useEffect, useState } from 'react';
import './PartNoQty.css'; // Import the CSS file
import { useFormContext } from '../../context/FormContext';

const PartNoQty = () => {

  const [rows, setRows] = useState([{
    partNo: '', qty: ''
  }]);

  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("partNoQty", rows); // ✅ Save to context whenever rows change
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { partNo: '', qty: '' }]);
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
      <h2 className="partnoqty-title">Part No. and Qty</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Part No.</th>
              <th className="partnoqty-header">Qty</th>
              <th className="partnoqty-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.partNo}
                    onChange={(e) => handleInputChange(index, 'partNo', e.target.value)}
                    className="partnoqty-input"
                    placeholder="Enter Part No."
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                    className="partnoqty-input"
                    placeholder="Enter Qty"
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
        Add Part No.
      </button>
    </div>
  );
};

export default PartNoQty;
