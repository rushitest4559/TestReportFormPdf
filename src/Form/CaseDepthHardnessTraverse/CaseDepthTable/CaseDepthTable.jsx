import { useEffect, useState } from "react";
import { useFormContext } from '../../../context/FormContext';

const CaseDepthTable = ({ onCaseDepthChange }) => {
    const [rows, setRows] = useState([{ caseDepth: '@PCD', specified: '', actual: '' }]);

    const { updateField } = useFormContext();

    useEffect(() => {
        updateField("CaseDepth", rows); // ✅ Save to context whenever rows change
    }, [rows]);

    const handleAddRow = () => {
        setRows([...rows, { caseDepth: '@PCD', specified: '', actual: '' }]);
    };

    const handleDeleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
        onCaseDepthChange(newRows.map(row => row.caseDepth)); // Notify parent
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows);
        onCaseDepthChange(newRows.map(row => row.caseDepth)); // Notify parent
    };

    useEffect(() => {
        onCaseDepthChange(rows.map(row => row.caseDepth));
    }, []);


    return (
        <div className="partnoqty-container">
            <h2 className="partnoqty-title">Case Depth</h2>
            <div className="partnoqty-wrapper">
                <table className="partnoqty-table">
                    <thead>
                        <tr>
                            <th className="partnoqty-header">Case Depth</th>
                            <th className="partnoqty-header">Specified</th>
                            <th className="partnoqty-header">Actual</th>
                            <th className="partnoqty-header">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td className="partnoqty-cell">
                                    <select
                                        value={row.caseDepth}
                                        onChange={(e) => handleInputChange(index, 'caseDepth', e.target.value)}
                                        className="partnoqty-input-select"
                                    >
                                        <option value="@PCD">@PCD</option>
                                        <option value="@OD">@OD</option>
                                        <option value="@RCD">@RCD</option>
                                        <option value="@Spline Root">@Spline Root</option>
                                        <option value="@Filet Root">@Filet Root</option>
                                    </select>
                                </td>
                                <td className="partnoqty-cell">
                                    <input
                                        type="text"
                                        value={row.specified}
                                        onChange={(e) => handleInputChange(index, 'specified', e.target.value)}
                                        className="core-hardness-input"
                                        placeholder="Enter Specified"
                                    />
                                </td>
                                <td className="partnoqty-cell">
                                    <input
                                        type="text"
                                        value={row.actual}
                                        onChange={(e) => handleInputChange(index, 'actual', e.target.value)}
                                        className="core-hardness-input"
                                        placeholder="Enter Actual"
                                    />
                                </td>
                                <td className="partnoqty-cell">
                                    <button
                                        onClick={() => handleDeleteRow(index)}
                                        className="partnoqty-delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handleAddRow} className="partnoqty-add-button">
                Add Case Depth
            </button>
        </div>
    );
};

export default CaseDepthTable;