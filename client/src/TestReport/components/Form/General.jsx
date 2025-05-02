import React, { useEffect, useState } from 'react';
import {customerChange, materialChange, partNameChange} from '../../services/suggesstions'

const GeneralInfo = ({ report, updateField }) => {

    const [form, setForm] = useState({
        testCertNo: report?.testCertNo || '',
        customer: report?.customer || '',
        partName: report?.partName || '',
        material: report?.material || ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
        if(name == 'customer') {
            customerChange(e, setCustomerSuggestions)
        }
        if(name == 'partName') {
            partNameChange(e, setPartSuggestions, form.customer)
        }
        if(name == 'material') {
            materialChange(e, setMaterialSuggestions, form.customer)
        }
    }

    const suggesstionClick = (field, suggestion) => {
        setForm(prev => ({
            ...prev,
            [field]: suggestion
        }))
        setCustomerSuggestions([])
        setPartSuggestions([])
        setMaterialSuggestions([])
    }

    useEffect(() => {
        updateField('testCertNo', form.testCertNo)
    }, [form.testCertNo])

    useEffect(() => {
        updateField('customer', form.customer)
    }, [form.customer])

    useEffect(() => {
        updateField('partName', form.partName)
    }, [form.partName])

    useEffect(() => {
        updateField('material', form.material)
    }, [form.material])

    // State for suggestions
    const [customersuggestions, setCustomerSuggestions] = useState([]);
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
                    value={form.testCertNo}
                    onChange={handleChange}
                    style={{ flex: '1', marginRight: '4px' }}
                />
                <span>/2025</span>
            </div>

            {/* Customer Name */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Customer Name: "
                    value={form.customer}
                    onChange={handleChange}
                    name="customer"
                />
                {customersuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {customersuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={()=>suggesstionClick('customer', suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Part Name */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    name="partName"
                    placeholder="Part name: "
                    value={form.partName}
                    onChange={handleChange}
                />
                {partSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {partSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={()=>suggesstionClick('partName', suggestion)}
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
                    value={form.material}
                    onChange={handleChange}
                />
                {materialSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {materialSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={()=>suggesstionClick('material', suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Date */}
            {/* <input
                type="date"
                name="date"
                value={report.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateField('date', e.target.value)}
            /> */}

        </div>
    );
};

export default GeneralInfo;
