import React, { useEffect, useState } from 'react';

const PartNoQty = ({ report, updateField }) => {
  const [rows, setRows] = useState(report?.partNoQty?.length > 0 ? report.partNoQty : [{ partNo: '', qty: '' }]);

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
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Part No. and Qty</h2>
        <button
          onClick={handleAddRow}
          style={{
            padding: '6px 12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Part No.
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, zIndex: 1 }}>Part No.</th>
              <th style={thStyle}>Qty</th>
              <th style={{ ...thStyle, position: 'sticky', right: 0, zIndex: 1 }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={{ ...tdStyle, backgroundColor: 'white' }}>
                  <input
                    style={inputStyle}
                    value={row.partNo}
                    onChange={(e) => handleInputChange(index, 'partNo', e.target.value)}
                    placeholder="Enter Part No."
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    style={inputStyle}
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                    placeholder="Enter Qty"
                  />
                </td>
                <td style={{ ...tdStyle, position: 'sticky', right: 0, backgroundColor: 'white' }}>
                  <button
                    onClick={() => handleDeleteRow(index)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reuse the same style constants from Parameters component
const thStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f7f7f7',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  backgroundColor: 'white'
};

const inputStyle = {
  width: '100%',
  padding: '6px',
  boxSizing: 'border-box',
};

export default PartNoQty;
