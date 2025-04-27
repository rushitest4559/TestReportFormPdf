// DownloadPDF.jsx
import React from "react";
import { useFormContext } from "../../context/FormContext";

const DownloadPDF = () => {

  const { loading, handleDownload } = useFormContext();

  return (
    <div style={styles.btnDiv}>
      <button style={styles.btn} onClick={handleDownload} disabled={loading}>
        {loading ? "Preparing PDF..." : "Download PDF"}
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
