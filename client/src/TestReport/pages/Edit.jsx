import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralInfo from '../components/Form/General';
import PartNoQty from '../components/Form/PartNoQty';
import Parameters from '../components/Form/Parameters';
import HardnessTraverse from '../components/Form/HardnessTraverse';
import HardnessSamples from '../components/Form/HardnessSamples';
import Remarks from '../components/Form/Remarks';
import { fetchTestReport, updateTestReport } from '../services/api';

const Edit = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate()

    const [report, setReport] = useState({});
    const [status, setStatus] = useState({ type: null, text: '' });
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const updateField = (field, value) => {
        setReport((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        fetchTestReport(id, setReport, setLoading1, setStatus);
    }, [id]);

    return (
        <div>
            {loading1 ? (
                <p>Loading test report data...</p>
            ) : (
                Object.keys(report).length > 0 && (
                    <>
                        {/* Status Alert */}
                        {status.text && (
                            <div style={{
                                padding: '10px',
                                backgroundColor: status.type === 'success' ? '#d4edda'
                                    : status.type === 'error' ? '#f8d7da' : '#fff3cd',
                                color: status.type === 'success' ? '#155724'
                                    : status.type === 'error' ? '#721c24' : '#856404',
                                border: '1px solid',
                                borderColor: status.type === 'success' ? '#c3e6cb'
                                    : status.type === 'error' ? '#f5c6cb' : '#ffeeba',
                                borderRadius: '4px',
                                marginBottom: '16px',
                                textAlign: 'center',
                            }}>
                                {status.text}
                            </div>
                        )}

                        {/* Form Sections */}
                        <GeneralInfo report={report} updateField={updateField} />
                        <PartNoQty report={report} updateField={updateField} />
                        <Parameters report={report} updateField={updateField} />
                        <HardnessTraverse report={report} updateField={updateField} />
                        <HardnessSamples report={report} updateField={updateField} />
                        <Remarks report={report} updateField={updateField} />

                        {/* Save Changes */}
                        <button
                            onClick={() => updateTestReport(id, report, setStatus, setLoading2, navigate)}
                            className='submit-btn'
                        >
                            {loading2 ? 'Saving...' : 'Save Changes'}
                        </button>
                    </>
                )
            )}
        </div>
    );
};

export default Edit;
