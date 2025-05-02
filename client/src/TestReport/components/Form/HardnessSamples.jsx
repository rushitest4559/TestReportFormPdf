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
    <div className="partnoqty-container">
      <h2 style={{marginTop: '50px'}} className="partnoqty-title">{getTitle()}</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Sample No.</th>
              <th className="partnoqty-header">Surface Hardness (HRC)</th>
              {/* <th className="partnoqty-header">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="partnoqty-cell">{row.sampleNo}</td>
                <td className="partnoqty-cell">
                  <input
                    type="number"
                    value={row.surfaceHardness}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="partnoqty-input"
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
      <button onClick={handleAddRow} className="add-btn">
        Add Sample
      </button>
    </div>
  );
};

export default HardnessSamples;
