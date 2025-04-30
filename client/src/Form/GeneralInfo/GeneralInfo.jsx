import React, { useState } from 'react';
import './GeneralInfo.css';
import CustomerNameInputField from '../../components/CustomerNameInputField/CustomerNameInputField';
import { partNameChange, materialChange } from '../../components/functions/suggestions';
import { useFormContext } from "../../context/FormContext";

const GeneralInfo = () => {
    const { reportData, updateField, fetchParameters,setParametersError, setParameters, setParametersLoading } = useFormContext();

    // State for suggestions
    const [partSuggestions, setPartSuggestions] = useState([]);
    const [materialSuggestions, setMaterialSuggestions] = useState([]);

    return (
        <div className='GeneralInfo'>
            <h2>General Info</h2>

            <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                <input
                    type="text"
                    name="testCertNo"
                    placeholder="Test certificate no:"
                    value={reportData.testCertNo || 'JHTPL/'}
                    onChange={(e) => updateField('testCertNo', e.target.value)}
                    style={{ flex: '1', marginRight: '4px' }}
                />
                <span>/2025</span>
            </div>

            {/* Customer Name */}
            <CustomerNameInputField />

            {/* Part Name */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    name="partName"
                    placeholder="Part name: "
                    value={reportData.partName || ''}
                    onChange={(e)=>partNameChange(e, updateField, setPartSuggestions)}
                />
                {partSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {partSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    updateField('partName', suggestion)
                                    setPartSuggestions([])
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Material */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    name="material"
                    placeholder="Material: "
                    value={reportData.material || ''}
                    onChange={(e)=>materialChange(e, updateField, setMaterialSuggestions)}
                />
                {materialSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {materialSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    updateField('material', suggestion)
                                    setMaterialSuggestions([])
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Date */}
            <input
                type="date"
                name="date"
                value={reportData.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateField('date', e.target.value)}
            />

            <button onClick={()=>fetchParameters(reportData, setParametersError, setParameters, setParametersLoading)}>OK</button>
        </div>
    );
};

export default GeneralInfo;
