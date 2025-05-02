import React, { useEffect, useState } from 'react';

const PartNoQty = ({ report, updateField }) => {
  const [rows, setRows] = useState(() => {
    return report?.partNoQty?.length > 0
      ? report.partNoQty
      : [{ partNo: '', qty: '' }];
  });

  useEffect(() => {
    updateField("partNoQty", rows);
  }, [rows]);

  const handleAddRow = () => {
    setRows([...rows, { partNo: '', qty: '' }]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
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
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={handleAddRow} 
      className="add-btn"
      >
        Add Part No.
      </button>
    </div>
  );
};

export default PartNoQty;
