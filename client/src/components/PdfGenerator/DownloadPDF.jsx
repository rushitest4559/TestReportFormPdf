// DownloadPDF.jsx
import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext";

const DownloadPDF = () => {

  const { reportData, handleDownload } = useFormContext();
  const [pdfLoading, setPdfLoading] = useState(false);

  return (
    <div style={styles.btnDiv}>
      <button style={styles.btn} onClick={()=>handleDownload(reportData, setPdfLoading)} disabled={pdfLoading}>
        {pdfLoading ? "Preparing PDF..." : "Download PDF"}
      </button>
    </div>
  );
};

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

export default DownloadPDF;
