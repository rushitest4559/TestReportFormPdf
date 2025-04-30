import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file for styling
import { useFormContext } from '../../context/FormContext';

const SurfaceHardnessTable = () => {
  const [rows, setRows] = useState([
    { sampleNo: 1, surfaceHardness: '' },
    { sampleNo: 2, surfaceHardness: '' },
    { sampleNo: 3, surfaceHardness: '' },
    { sampleNo: 4, surfaceHardness: '' },
    { sampleNo: 5, surfaceHardness: '' },
  ]);

  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("HardnessSamples", rows); // ✅ Save to context whenever rows change
  }, [rows]);

  const handleAddRow = () => {
    const newSampleNo = rows.length > 0 ? rows[rows.length - 1].sampleNo + 1 : 1;
    setRows([...rows, { sampleNo: newSampleNo, surfaceHardness: '' }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    // Renumber the sampleNos after deletion
    const updatedRows = newRows.map((row, i) => ({ ...row, sampleNo: i + 1 }));
    setRows(updatedRows);
  };

  const handleInputChange = (index, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], surfaceHardness: value }; // corrected field name
    setRows(newRows);
  };

    const getTitle = () => {
        return `Surface Hardness of ${rows.length} Samples`;
    }

  return (
    <div className="partnoqty-container">
      <h2 className="partnoqty-title">{getTitle()}</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Sample Nos.</th>
              <th className="partnoqty-header">Surface Hardness in HRC</th>
              <th className="partnoqty-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="partnoqty-cell">{row.sampleNo}</td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    value={row.surfaceHardness}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="partnoqty-input"
                    placeholder="Enter Surface Hardness"
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
        Add Sample
      </button>
    </div>
  );
};

export default SurfaceHardnessTable;
