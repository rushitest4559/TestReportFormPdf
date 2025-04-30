import React from 'react';
import { useFormContext } from '../../context/FormContext';

const Parameters = () => {
    const { parameters, reportData, updateField } = useFormContext();

    const isMicrostructure = (param) =>
        param.name.trim().toLowerCase() === 'microstructure';

    const parseMicrostructure = (value) => {
        const caseMatch = value.match(/Case:\s*([^.]*)/i);
        const coreMatch = value.match(/Core:\s*([^.]*)/i);
        return {
            case: caseMatch ? caseMatch[1].trim() : '',
            core: coreMatch ? coreMatch[1].trim() : '',
        };
    };

    const handleChange = (key, value) => {
        const current = reportData.parametersActual || {};
        updateField('parametersActual', {
            ...current,
            [key]: value,
        });
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Parameters</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Parameter</th>
                            <th style={thStyle}>Specified</th>
                            <th style={thStyle}>Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parameters.map((parameter, index) => {
                            if (isMicrostructure(parameter)) {
                                const micro = parseMicrostructure(parameter.value);
                                return (
                                    <React.Fragment key={index}>
                                        {['Case', 'Core'].map((type) => {
                                            const key = `Microstructure - ${type}`;
                                            const value = micro[type.toLowerCase()];
                                            return (
                                                <tr key={type}>
                                                    <td style={tdStyle}>{key}</td>
                                                    <td style={tdStyle}>{value}</td>
                                                    <td style={tdStyle}>
                                                        <input
                                                            style={inputStyle}
                                                            value={reportData.parametersActual?.[key] || ''}
                                                            onChange={(e) =>
                                                                handleChange(key, e.target.value)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            }

                            const key = parameter.name.trim();

                            return (
                                <tr key={index}>
                                    <td style={tdStyle}>{parameter.name}</td>
                                    <td style={tdStyle}>{parameter.value}</td>
                                    <td style={tdStyle}>
                                        <input
                                            style={inputStyle}
                                            value={reportData.parametersActual?.[key] || ''}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px', // Ensures it's scrollable on narrow screens
};

const thStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f8f8',
    textAlign: 'left',
    fontWeight: 'bold',
};

const tdStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    verticalAlign: 'top',
};

const inputStyle = {
    width: '100%',
    minWidth: '320px',
    padding: '4px',
    boxSizing: 'border-box',
    fontSize: '14px',
};

// Optionally, for better responsiveness, you can move styles to a CSS file or use styled-components

export default Parameters;
