import React, { useEffect, useState } from 'react';

const Parameters = ({ report, updateField }) => {
    const upperCaseParams = ['Heat Treatment', 'Surface Hardness', 'Core Hardness', 'Thread Hardness'];
    const [parameters, setParameters] = useState(report?.parameters || [     
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...parameters];
        if ((field === 'actual'  || field == 'specified') && upperCaseParams.includes(updated[index].name.trim())) {
            updated[index][field] = value.toUpperCase();
        } else {
            updated[index][field] = value;
        }
        setParameters(updated);
    };

    const addParameter = () => {
        setParameters(prev => [...prev, { name: '', specified: '', actual: '' }]);
    };

    const deleteParameter = (index) => {
        setParameters(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        updateField('parameters', parameters);
    }, [parameters]);

    useEffect(() => {
        if (JSON.stringify(report.parameters) !== JSON.stringify(parameters)) {
            setParameters(report.parameters || []);
        }
    }, [report?.parameters]);

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>Parameters</h2>
                <button
                    onClick={addParameter}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Add Parameter
                </button>
            </div>

            {/* Scrollable table container */}
            <div style={{ overflowX: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ ...thStyle, zIndex: 1 }}>Parameter</th>
                            <th style={thStyle}>Specified</th>
                            <th style={thStyle}>Actual</th>
                            <th style={{ ...thStyle, position: 'sticky', right: 0, zIndex: 1 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parameters.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={emptyStyle}>No parameters available. Click "Add Parameter" to create one.</td>
                            </tr>
                        ) : (
                            parameters.map((param, index) => (
                                <tr key={index}>
                                    <td style={{ ...tdStyle, backgroundColor: 'white' }}>
                                        <input
                                            style={inputStyle1}
                                            value={param.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            placeholder="Parameter name"
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            style={inputStyle}
                                            value={param.specified}
                                            onChange={(e) => handleChange(index, 'specified', e.target.value)}
                                            placeholder="Specified value"
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            style={inputStyle}
                                            value={param.actual}
                                            onChange={(e) => handleChange(index, 'actual', e.target.value)}
                                            placeholder="Actual value"
                                        />
                                    </td>
                                    <td style={{ ...tdStyle, position: 'sticky', right: 0, backgroundColor: 'white' }}>
                                        <button
                                            onClick={() => deleteParameter(index)}
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
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
    backgroundColor: 'white'
};

const inputStyle = {
    width: '100%',
    minWidth: '300px',
    padding: '6px',
    boxSizing: 'border-box',
};

const inputStyle1 = {
    width: '100%',
    minWidth: '200px',
    padding: '6px',
    boxSizing: 'border-box',
};

const emptyStyle = {
    textAlign: 'center',
    padding: '1rem',
    color: '#9ca3af',
};

export default Parameters;
