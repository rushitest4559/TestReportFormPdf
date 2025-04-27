import React, { useState } from 'react';
import CaseDepthTable from './CaseDepthTable/CaseDepthTable'
import HardnessTraverseTable from './HardnessTraverseTable/HardnessTraverseTable'
import '../PartNoQty/PartNoQty.css'; // Import the same CSS file for styling

const CaseDepthHardnessTraverse = () => {
    const [selectedCaseDepths, setSelectedCaseDepths] = useState([]);

    const handleCaseDepthChange = (caseDepths) => {
        setSelectedCaseDepths(caseDepths);
    };

    return (
        <div>
            <CaseDepthTable onCaseDepthChange={handleCaseDepthChange} />
            <HardnessTraverseTable selectedCaseDepths={selectedCaseDepths} />
        </div>
    );
};

export default CaseDepthHardnessTraverse;
