// FormContext.js
import React, { createContext, useContext, useState } from "react";
import MyDocument from '../components/PdfGenerator/MyDocument'
import { pdf } from "@react-pdf/renderer";

const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [reportData, setReportData] = useState({})
    const updateField = (field, value) => {
        setReportData((prev) => ({ ...prev, [field]: value }));
    };

    // Download Pdf
    const [loading, setLoading] = useState(false);
    const handleDownload = async () => {
        console.log("reportData", reportData);
        setLoading(true);
        const blob = await pdf(<MyDocument reportData={reportData} />).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "test_report.pdf";
        link.click();

        URL.revokeObjectURL(url);
        setLoading(false);
    };

    return (
        <FormContext.Provider value={{
            reportData, setReportData, updateField,
            loading, handleDownload
        }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
