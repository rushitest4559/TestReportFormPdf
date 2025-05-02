import React from 'react';

const Remarks = ({ report, updateField }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>
      <h2 className="partnoqty-title">Remarks</h2>
      <textarea
        id="remarks"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
        placeholder="Enter your remarks here..."
        rows={4}
        value={report.remarks || ''}
        onChange={(e) => updateField('remarks', e.target.value)}
      />
    </div>
  );
};

export default Remarks;
