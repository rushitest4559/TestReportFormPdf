import axios from "axios";

export async function fetchAIRemarks(reportData, setRemarksLoading, setAiError, setAiRemarks) { // Pass your data object as an argument
    setRemarksLoading(true);
    setAiError(null);

    try {
        const prompt = `Generate remarks based on the following data:
        ${JSON.stringify(reportData)}. Indicate if the data generally meets specifications and provide reasons for any deviations. Give concize answer(accepted or not), if not accepted then give reason in one line.`; // A more specific prompt

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + "AIzaSyCs1hbR-pnEKv8GWUb5XIn7MCF0jJZDS7c", { // Replace with your actual key
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching AI remarks:", errorData);
            setAiError(`Failed to fetch remarks: ${response.statusText}`);
        } else {
            const data = await response.json();
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                setAiRemarks(data.candidates[0].content.parts[0].text);
            } else {
                setAiError("Could not extract remarks from the response.");
            }
        }
    } catch (err) {
        console.error("Error during API call:", err);
        setAiError(`An unexpected error occurred: ${err.message}`);
    } finally {
        setRemarksLoading(false);
    }
}

export const handleDownload = async (reportData, setPdfLoading) => {
    console.log("reportData", reportData);
    setPdfLoading(true);
    const blob = await pdf(<MyDocument reportData={reportData} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "test_report.pdf";
    link.click();

    URL.revokeObjectURL(url);
    setPdfLoading(false);
};

export const fetchParameters = async (reportData, setParametersError, setParameters, setParametersLoading) => {
    setParametersError('');
    setParameters([]);
    setParametersLoading(true);

    let customerName = reportData.customer
    let partName = reportData.partName
    let material = reportData.material

    try {
        const response = await axios.post('/api/customers/getParameters', {
            customerName,
            partName,
            material
        });
        if (response.data.success) {
            setParameters(response.data.parameters);
            console.log(response.data.parameters)
        } else {
            setParametersError(response.data.error || 'Failed to fetch parameters');
        }
    } catch (err) {
        setParametersError('Error connecting to the server');
        console.log('Error connecting to the server', err)
    } finally {
        setParametersLoading(false);
    }
};