import React from 'react';
import { useFormContext } from '../../context/FormContext';

const HardnessTraverse = () => {
    const { parameters, reportData, updateField } = useFormContext();

    // Extract "Case depth" parameters
    const caseDepthParams = parameters.filter(param =>
        param.name.toLowerCase().includes('case depth')
    );

    // Distances from 0.1 to 1.0
    const distances = Array.from({ length: 10 }, (_, i) => ((i + 1) * 0.1).toFixed(1));

    // Extract column keys like "PCD", "OD"
    const columnKeys = caseDepthParams.map((param, idx) => {
        const match = param.name.match(/@([A-Za-z]+)/);
        return match ? match[1] : `Pos${idx + 1}`;
    });

    // Update specific cell
    const handleChange = (distance, column, value) => {
        const current = reportData.hardnessTraverse || {};
        const updatedRow = { ...(current[distance] || {}), [column]: value };
        updateField('hardnessTraverse', {
            ...current,
            [distance]: updatedRow,
        });
    };

    return (
        <div style={{ padding: '1rem', overflowX: 'auto' }}>
            <h2>Hardness Traverse</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Distance (mm)</th>
                        {columnKeys.map((col, idx) => (
                            <th key={idx} style={thStyle}>
                                Hardness (@{col})
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {distances.map((distance, rowIdx) => (
                        <tr key={rowIdx}>
                            <td style={tdStyle}>{distance}</td>
                            {columnKeys.map((col, colIdx) => (
                                <td key={colIdx} style={tdStyle}>
                                    <input
                                        type="text"
                                        style={inputStyle}
                                        value={
                                            reportData.hardnessTraverse?.[distance]?.[col] || ''
                                        }
                                        onChange={(e) =>
                                            handleChange(distance, col, e.target.value)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

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
