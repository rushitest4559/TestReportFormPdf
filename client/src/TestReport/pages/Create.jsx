import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GeneralInfo from '../components/Form/General'
import PartNoQty from '../components/Form/PartNoQty';
import Parameters from '../components/Form/Parameters';
import HardnessTraverse from '../components/Form/HardnessTraverse';
import HardnessSamples from '../components/Form/HardnessSamples';
import Remarks from '../components/Form/Remarks';
import { fetchAIRemarks, fetchParameters } from '../services/Fetch';
import { createTestReport } from '../services/api';

const Create = () => {

    const navigate = useNavigate()

    const [report, setReport] = useState({
        testCertNo: 'JHTPL/',
        parameters: [
            { name: 'Heat Treatment', specified: 'CHT', actual: 'CHT' },
            { name: 'Surface Hardness', specified: '58-62 HRC', actual: '' },
            { name: 'Core Hardness', specified: '', actual: '' },
            { name: 'Core Hardness', specified: '', actual: '' },
            { name: 'Case Depth', specified: '', actual: '' },
            { name: 'Case Depth', specified: '', actual: '' },
            { name: 'Thread Hardness', specified: '', actual: '' },
            { name: 'Microstructure-Case', specified: '', actual: '' },
            { name: 'Microstructure-Core', specified: '', actual: '' },
        ]
    })

    const updateField = (field, value) => {
        setReport((prev) => ({ ...prev, [field]: value }));
    };

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)

    const [status, setStatus] = useState({ type: null, text: '' })

    return (
        <div>

            <Link to="/create"><button className='add-btn'>Back to Test Reports</button></Link>
            <br /><br />

            {status.text && (
                <div
                    style={{
                        padding: '10px',
                        backgroundColor:
                            status.type === 'success'
                                ? '#d4edda'
                                : status.type === 'error'
                                    ? '#f8d7da'
                                    : '#fff3cd',
                        color:
                            status.type === 'success'
                                ? '#155724'
                                : status.type === 'error'
                                    ? '#721c24'
                                    : '#856404',
                        border: '1px solid',
                        borderColor:
                            status.type === 'success'
                                ? '#c3e6cb'
                                : status.type === 'error'
                                    ? '#f5c6cb'
                                    : '#ffeeba',
                        borderRadius: '4px',
                        marginBottom: '16px',
                        textAlign: 'center',
                    }}
                >
                    {status.text}
                </div>
            )}

            <GeneralInfo report={report} updateField={updateField} />

            {/* ok button to fetch parameters */}
            <button
                onClick={() => fetchParameters(report, updateField, setLoading1, setStatus)}
                className='add-btn'
            >
                {loading1 ? 'loading parameters' : 'OK'}
            </button>

            <PartNoQty report={report} updateField={updateField} />
            <Parameters report={report} updateField={updateField} />
            <HardnessTraverse report={report} updateField={updateField} />
            <HardnessSamples report={report} updateField={updateField} />

            {/* Generate remarks button */}
            <button
                className='add-btn'
                onClick={() => fetchAIRemarks(report, updateField, setLoading2, setStatus)}
            >
                {loading2 ? 'Generating...' : 'Generate AI Remarks'}
            </button>

            <Remarks report={report} updateField={updateField} />

            {/* create test report */}
            <button
                onClick={() => createTestReport(report, setLoading3, setStatus, navigate)}
                className='submit-btn'
            >
                {loading3 ? 'Creating' : 'Create Test Report'}
            </button>
        </div>
    )
}

export default Create