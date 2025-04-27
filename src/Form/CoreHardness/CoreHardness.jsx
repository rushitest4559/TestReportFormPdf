import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file for styling
import './CoreHardness.css'
import { useFormContext } from '../../context/FormContext';

const CoreHardnessTable = () => {
  const [rows, setRows] = useState([{
    coreHardness: '@PCD', specified: '', actual: '',
  }]);

  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("coreHardnessData", rows); // ✅ Save to context whenever rows change
  }, [rows]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { coreHardness: '@PCD', specified: '', actual: '' },
    ]);
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
      <h2 className="partnoqty-title">Core Hardness</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Core Hardness</th>
              <th className="partnoqty-header">Specified</th>
              <th className="partnoqty-header">Actual</th>
              <th className="partnoqty-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="partnoqty-cell">
                  <select
                    value={row.coreHardness}
                    onChange={(e) =>
                      handleInputChange(index, 'coreHardness', e.target.value)
                    }
                    className="partnoqty-input-select"
                  >
                    <option value="@PCD">@PCD</option>
                    <option value="@RCD">@RCD</option>
                    <option value="@OD">@OD</option>
                  </select>
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.specified}
                    onChange={(e) =>
                      handleInputChange(index, 'specified', e.target.value)
                    }
                    className="core-hardness-input"
                    placeholder="Enter Specified"
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.actual}
                    onChange={(e) =>
                      handleInputChange(index, 'actual', e.target.value)
                    }
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
        Add Core Hardness
      </button>
    </div>
  );
};

export default CoreHardnessTable;
