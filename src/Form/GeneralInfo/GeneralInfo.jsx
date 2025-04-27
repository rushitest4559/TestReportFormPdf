import React from 'react'
import './GeneralInfo.css'
import CustomerNameInputField from '../../components/CustomerNameInputField/CustomerNameInputField';
import { useFormContext } from "../../context/FormContext";

const GeneralInfo = () => {

    const { reportData, updateField } = useFormContext();

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

            <input
                type="text"
                name='partName'
                placeholder='Part name: '
                value={reportData.partName || ''}
                onChange={(e) => updateField('partName', e.target.value)}
            />
            <input
                type="text"
                name='material'
                placeholder='Material: '
                value={reportData.material || ''}
                onChange={(e) => updateField('material', e.target.value)}
            />
            <input
                type="date"
                name="date"
                value={reportData.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateField('date', e.target.value)}
            />

        </div>
    )
}

export default GeneralInfo;