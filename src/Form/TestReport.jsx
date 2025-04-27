import React from 'react'
import GeneralInfo from './GeneralInfo/GeneralInfo'
import PartNoQty from './PartNoQty/PartNoQty'
import CoreHardnessTable from './CoreHardness/CoreHardness'
import CaseDepthHardnessTraverse from './CaseDepthHardnessTraverse/CaseDepthHardnessTraverse'
import MicroStructureTable from './MicroStructureTable/MicroStructureTable'
import HardnessTable from './SurfaceHardness/HardnessTable'
import SurfaceHardnessTable from './SurfaceHardnessSamples/SurfaceHardnessTable'
import RemarksAndCreatedBy from './RemarksAndCreatedBy/RemarksAndCreatedBy'
import DownloadPDF from '../components/PdfGenerator/DownloadPDF'
import ParameterTable from './ParameterTable/ParameterTable'

const TestReport = () => {
  return (
    <div>
        <GeneralInfo/>
        <PartNoQty/>
        <HardnessTable/>
        <CoreHardnessTable/>
        <CaseDepthHardnessTraverse/>
        <MicroStructureTable/>
        <ParameterTable/>
        <SurfaceHardnessTable/>
        <RemarksAndCreatedBy/>
        <DownloadPDF />
    </div>
  )
}

export default TestReport