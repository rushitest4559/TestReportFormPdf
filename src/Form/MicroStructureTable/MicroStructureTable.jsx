import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file for styling
import { useFormContext } from '../../context/FormContext';

const MicroStructureTable = () => {
  const [rows, setRows] = useState([
    { specified: 'Case: ', actual: 'Case: ' },
    { specified: 'Core: ', actual: 'Core: ' },
  ]);

  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("microStructureData", rows); // ✅ Save to context whenever rows change
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { specified: '', actual: '' }]);
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

  const getSpecifiedPlaceholder = (index, columnNo) => {
    if (index === 0) {
      return 'Case';
    } else if (index === 1) {
      return 'Core';
    } else {
      if(columnNo == 1) {
        return 'Enter Specified'
      } else if(columnNo == 2) {
        return 'Enter Actual'
      }
    }
  };

  return (
    <div className="partnoqty-container">
      <h2 className="partnoqty-title">MicroStructure</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
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
                    value={row.specified}
                    onChange={(e) => handleInputChange(index, 'specified', e.target.value)}
                    className="core-hardness-input"
                    placeholder={getSpecifiedPlaceholder(index, 1)}
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.actual}
                    onChange={(e) => handleInputChange(index, 'actual', e.target.value)}
                    className="core-hardness-input"
                    placeholder={getSpecifiedPlaceholder(index, 2)}
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
        Add Row
      </button>
    </div>
  );
};

export default MicroStructureTable;
