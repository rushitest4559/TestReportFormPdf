import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file
import './RemarksAndCreatedBy.css'
import { useFormContext } from '../../context/FormContext';

const RemarksAndCreatedBy = () => {

  const { updateField, aiRemarks } = useFormContext();

  const [remarks, setRemarks] = useState('');
  const [createdBy, setCreatedBy] = useState('');  

  useEffect(() => {
    updateField('remarksAndCreatedBy', { remarks, createdBy });
  }, [remarks, createdBy]);

  useEffect(() => {
    setRemarks(aiRemarks)
  }, [aiRemarks])

  return (
    <div className="partnoqty-container">
      <h2 className="partnoqty-title">Remarks and Created By</h2>
      <div className="partnoqty-form-wrapper">
        <div className="partnoqty-form-group">
          <label htmlFor="remarks" className="partnoqty-label">Remarks</label>
          <textarea
            id="remarks"
            className="partnoqty-textarea"
            placeholder="Enter your remarks here..."
            rows={4} // Added rows attribute for better initial size
            value={remarks} // ✅ controlled input
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div className="partnoqty-form-group">
          <label htmlFor="createdBy" className="partnoqty-label">Created By</label>
          <input
            type="text"
            id="createdBy"
            className="partnoqty-input"
            placeholder="Enter your name"
            value={createdBy} // ✅ controlled input
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RemarksAndCreatedBy;
