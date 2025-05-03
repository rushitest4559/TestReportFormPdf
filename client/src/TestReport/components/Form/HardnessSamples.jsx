import React, { useEffect, useState } from 'react';

const HardnessSamples = ({ report, updateField }) => {
  const [rows, setRows] = useState(() => {
    return report?.hardnessSamples?.length > 0
      ? report.hardnessSamples
      : [
        { sampleNo: 1, surfaceHardness: '' },
        { sampleNo: 2, surfaceHardness: '' },
        { sampleNo: 3, surfaceHardness: '' },
        { sampleNo: 4, surfaceHardness: '' },
        { sampleNo: 5, surfaceHardness: '' },
      ];
  });

  useEffect(() => {
    updateField('hardnessSamples', rows);
  }, [rows]);

  const handleAddRow = () => {
    const newSampleNo = rows.length > 0 ? rows[rows.length - 1].sampleNo + 1 : 1;
    setRows([...rows, { sampleNo: newSampleNo, surfaceHardness: '' }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    const renumbered = newRows.map((row, i) => ({ ...row, sampleNo: i + 1 }));
    setRows(renumbered);
  };

  const handleInputChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].surfaceHardness = value;
    setRows(newRows);
  };

  const getTitle = () => `Surface Hardness of ${rows.length} Sample${rows.length !== 1 ? 's' : ''}`;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>{getTitle()}</h2>
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
          Add Sample
        </button>
      </div>
      
      <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Sample No.</th>
              <th style={thStyle}>Surface Hardness (HRC)</th>
              {/* <th className="partnoqty-header">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{row.sampleNo}</td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    value={row.surfaceHardness}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={inputStyle}
                    placeholder="Enter Surface Hardness"
                  />
                </td>
                {/* <td className="partnoqty-cell">
                  <button
                    onClick={() => handleDeleteRow(index)}
                    className="partnoqty-delete-button"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button onClick={handleAddRow} className="add-btn">
        Add Sample
      </button> */}
    </div>
  );
};

const thStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f7f7f7',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
};

const inputStyle = {
  width: '100%',
  padding: '6px',
  boxSizing: 'border-box',
};

export default HardnessSamples;
