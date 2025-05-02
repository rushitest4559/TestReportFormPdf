import React, { useEffect, useState } from 'react';

const Parameters = ({ report, updateField }) => {
    const upperCaseParams = ['Heat Treatment', 'Surface Hardness', 'Core Hardness'];

    const [parameters, setParameters] = useState(() => report?.parameters || []);

    const handleChange = (index, value) => {
        const updated = [...parameters];
        const paramName = updated[index].name.trim();

        updated[index].actual = upperCaseParams.includes(paramName)
            ? value.toUpperCase()
            : value;

        setParameters(updated);
    };

    // 🔁 Update field only when local state changes
    useEffect(() => {
        updateField('parameters', parameters);
    }, [parameters]);

    // ✅ Only update local state if props change (deep check manually if needed)
    useEffect(() => {
        if (JSON.stringify(report.parameters) !== JSON.stringify(parameters)) {
            setParameters(report.parameters || []);
        }
    }, [report?.parameters]);

    return (
        <div style={{ padding: '1rem', overflowX: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Parameters</h2>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Parameter</th>
                        <th style={thStyle}>Specified</th>
                        <th style={thStyle}>Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.length === 0 ? (
                        <tr>
                            <td colSpan={3} style={emptyStyle}>No Parameters available.</td>
                        </tr>
                    ) : (
                        parameters.map((param, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{param.name}</td>
                                <td style={tdStyle}>{param.specified}</td>
                                <td style={tdStyle}>
                                    <input
                                        style={inputStyle}
                                        value={param.actual || ''}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const thStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
};

const tdStyle = {
    padding: '8px',
    border: '1px solid #ccc',
};

const inputStyle = {
    width: '100%',
    padding: '6px',
    boxSizing: 'border-box',
};

const emptyStyle = {
    textAlign: 'center',
    padding: '1rem',
    color: '#9ca3af',
};

export default Parameters;
