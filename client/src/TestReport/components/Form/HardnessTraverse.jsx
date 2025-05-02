import React from 'react';

const HardnessTraverse = ({ report, updateField }) => {
  const parameters = report?.parameters || [];

  // Extract "Case depth" parameters safely
  const caseDepthParams = parameters.filter(param =>
    param.name.toLowerCase().includes('case depth')
  );

  // Distances from 0.1 to 1.0 mm
  const distances = Array.from({ length: 10 }, (_, i) => ((i + 1) * 0.1).toFixed(1));

  // Extract column keys like "PCD", "OD"
  const columnKeys = caseDepthParams.map((param, idx) => {
    const match = param.name.match(/@([A-Za-z]+)/);
    return match ? match[1] : `Pos${idx + 1}`;
  });

  // Handle cell input changes
  const handleChange = (distance, column, value) => {
    const current = report.hardnessTraverse || {};
    const updatedRow = { ...(current[distance] || {}), [column]: value };
    updateField('hardnessTraverse', {
      ...current,
      [distance]: updatedRow,
    });
  };

  return (
    <div style={{ padding: '1rem', overflowX: 'auto' }}>
      <h2>Hardness Traverse</h2>

      {columnKeys.length === 0 ? (
        <p style={{ color: 'gray', textAlign: 'center' }}>
          No "Case Depth" parameters found in report.
        </p>
      ) : (
        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Distance (mm)</th>
              {columnKeys.map((col, idx) => (
                <th key={idx} style={thStyle}>Hardness (@{col})</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distances.map((distance) => (
              <tr key={distance}>
                <td style={tdStyle}>{distance}</td>
                {columnKeys.map((col) => (
                  <td key={col} style={tdStyle}>
                    <input
                      type="text"
                      style={inputStyle}
                      value={report.hardnessTraverse?.[distance]?.[col] || ''}
                      onChange={(e) => handleChange(distance, col, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const thStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  textAlign: 'center',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '6px',
  border: '1px solid #ccc',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '4px',
  boxSizing: 'border-box',
};

export default HardnessTraverse;
