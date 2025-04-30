// FormContext.js
import React, { createContext, useContext, useState } from "react";
import MyDocument from '../components/PdfGenerator/MyDocument'
import { pdf } from "@react-pdf/renderer";
import axios from "axios";
import { fetchAIRemarks, fetchParameters, handleDownload } from "../components/functions/other";

const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [reportData, setReportData] = useState({})
    const updateField = (field, value) => {
        setReportData((prev) => ({ ...prev, [field]: value }));
    };

    const [aiRemarks, setAiRemarks] = useState('');
    const [remarksLoading, setRemarksLoading] = useState(false);
    const [aiError, setAiError] = useState(null);

    const [parameters, setParameters] = useState([]);
    const [parametersError, setParametersError] = useState('');
    const [parametersLoading, setParametersLoading] = useState(false);
    

    return (
        <FormContext.Provider value={{
            reportData, setReportData, updateField,
             handleDownload,
            remarksLoading, setRemarksLoading, fetchAIRemarks, aiRemarks, setAiRemarks, aiError, setAiError, 
            parameters, parametersError, parametersLoading, fetchParameters, setParametersError, setParameters, setParametersLoading
        }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
