import React from 'react'
import GeneralInfo from './GeneralInfo/GeneralInfo'
import PartNoQty from './PartNoQty/PartNoQty'
import SurfaceHardnessTable from './SurfaceHardnessSamples/SurfaceHardnessTable'
import RemarksAndCreatedBy from './RemarksAndCreatedBy/RemarksAndCreatedBy'
import DownloadPDF from '../components/PdfGenerator/DownloadPDF'
import { useFormContext } from '../context/FormContext';
import Parameters from './Parameters/Parameters'
import HardnessTraverse from './HardnessTraverse/HardnessTraverse'

const TestReport = () => {

  const { reportData, fetchAIRemarks, remarksLoading, aiError, setAiError, setRemarksLoading, setAiRemarks } = useFormContext();  

  const handleClick = () => {
    fetchAIRemarks(reportData, setRemarksLoading, setAiError, setAiRemarks)
    console.log(reportData)
    if(aiError != null) alert(aiError)
  }

  return (
    <div>
      <GeneralInfo />
      <PartNoQty />
      <Parameters />
      <HardnessTraverse />
      <SurfaceHardnessTable />
      <div style={styles.btnDiv}>
        <button style={styles.btn} onClick={handleClick} disabled={remarksLoading}>
          {remarksLoading ? 'Loading Remarks' : 'Submit Test Data'}
        </button>
      </div>
      <RemarksAndCreatedBy />
      <DownloadPDF />
    </div>
  )
}

const styles = {
  btnDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '96vw'
  },
  btn: {
    padding: '10px 16px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    margin: '5px 0 50px',
  }
}

export default TestReport