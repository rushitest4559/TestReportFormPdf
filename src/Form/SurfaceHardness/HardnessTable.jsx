import React, { useEffect, useState } from 'react';
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file for styling
import { useFormContext } from '../../context/FormContext';

const HardnessTable = () => {

  const [data, setData] = useState({
    surfaceSpecified: '',
    surfaceActual: '',
    grindingSpecified: '',
    grindingActual: ''
  })
  const { updateField } = useFormContext();

  useEffect(() => {
    updateField("Hardness", data); // ✅ Save to context whenever rows change
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  };   

  const [showOptionalRow, setShowOptionalRow] = useState(false);
  const toggleOptionalRow = () => {
    setShowOptionalRow(!showOptionalRow);
  };

  return (
    <div className="partnoqty-container">
      <h2 className="partnoqty-title">Hardness</h2>
      <div className="partnoqty-wrapper">
        <table className="partnoqty-table">
          <thead>
            <tr>
              <th className="partnoqty-header">Hardness</th>
              <th className="partnoqty-header">Specified</th>
              <th className="partnoqty-header">Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="partnoqty-cell">Surface Hardness</td>
              <td className="partnoqty-cell">
                <input
                  type="text"
                  name='surfaceSpecified'
                  value={data.surfaceSpecified}
                  onChange={handleChange}
                  className="core-hardness-input"
                  placeholder="Enter Specified"
                />
              </td>
              <td className="partnoqty-cell">
                <input
                  type="text"
                  name='surfaceActual'
                  value={data.surfaceActual}
                  onChange={handleChange}
                  className="core-hardness-input"
                  placeholder="Enter Actual"
                />
              </td>
            </tr>
            {showOptionalRow && (
              <tr>
                <td className="partnoqty-cell">After Grinding Surface Hardness</td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    name='grindingSpecified'
                    value={data.grindingSpecified}
                    onChange={handleChange}
                    className="core-hardness-input"
                    placeholder="Enter Specified"
                  />
                </td>
                <td className="partnoqty-cell">
                  <input
                    type="text"
                    name='grindingActual'
                    value={data.grindingActual}
                    onChange={handleChange}
                    className="core-hardness-input"
                    placeholder="Enter Actual"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={toggleOptionalRow} className="partnoqty-add-button">
        {showOptionalRow ? 'Hide Optional Row' : 'Show Optional Row'}
      </button>
    </div>
  );
};

export default HardnessTable;
