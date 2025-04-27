import { useState, useEffect } from "react";
import './HardnessTraverseTable.css';
import { useFormContext } from '../../../context/FormContext';

const HardnessTraverseTable = ({ selectedCaseDepths }) => {
    const [rows, setRows] = useState([]);

    const { updateField } = useFormContext();

    useEffect(() => {
        updateField("HardnessTraverse", rows); // ✅ Save to context whenever rows change
    }, [rows]);

    // Initialize rows when component loads or selectedCaseDepths change
    useEffect(() => {
        const initialRows = [
            { distance: 0.1 },
            { distance: 0.2 },
            { distance: 0.3 },
            { distance: 0.4 },
            { distance: 0.5 },
            { distance: 0.6 },
            { distance: 0.7 },
            { distance: 0.8 },
            { distance: 0.9 },
            { distance: 1.0 },
        ].map((row) => {
            const hardness = {};
            selectedCaseDepths.forEach(depth => {
                hardness[depth] = ""; // Empty initially
            });
            return { ...row, hardness };
        });

        setRows(initialRows);
    }, [selectedCaseDepths]);

    const handleInputChange = (rowIndex, depth, value) => {
        const newRows = [...rows];
        newRows[rowIndex].hardness[depth] = value;
        setRows(newRows);
    };

    return (
        <div className="partnoqty-container">
            <h2 className="partnoqty-title">Hardness Traverse</h2>
            <div className="partnoqty-wrapper hardness-traverse-wrapper">
                <table className="partnoqty-table">
                    <thead>
                        <tr>
                            <th className="partnoqty-header">Distance (mm)</th>
                            {selectedCaseDepths.map((depth, index) => (
                                <th key={index} className="partnoqty-header">
                                    Hardness ({depth})
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="partnoqty-cell">{row.distance}</td>
                                {selectedCaseDepths.map((depth, depthIndex) => (
                                    <td key={depthIndex} className="partnoqty-cell">
                                        <input
                                            type="text"
                                            value={row.hardness[depth] || ""}
                                            onChange={(e) => handleInputChange(rowIndex, depth, e.target.value)}
                                            className="partnoqty-input"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HardnessTraverseTable;
