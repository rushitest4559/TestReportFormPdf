import axios from 'axios';

export const fetchParameters = async (data, updateField, setLoading, setStatus) => {
    setLoading(true);

    const { customer, partName, material } = data;

    try {
        const response = await axios.post('/api/customers/getParameters', {
            customer,
            partName,
            material
        });

        if (response.data.success) {
            updateField('parameters', response.data.parameters);
            setStatus({ type: 'success', text: 'Parameters fetched successfully!' });
            console.log(response.data.parameters);
        } else {
            setStatus({ type: 'error', text: response.data.message || 'Failed to fetch parameters' });
        }
    } catch (err) {
        setStatus({ type: 'error', text: 'Error connecting to the server. '+err.response?.data?.message });
        console.error('Error connecting to the server', err.response?.data?.message);
    } finally {
        setLoading(false);
    }
};


export async function fetchAIRemarks(reportData, updateField, setLoadingRemarks, setStatus) { // Pass your data object as an argument
    setLoadingRemarks(true);
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
            setStatus({ type: 'error', text: `Failed to fetch remarks: ${response.statusText}` });
        } else {
            const data = await response.json();
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                updateField('remarks', data.candidates[0].content.parts[0].text);
                setStatus({ type: 'success', text: "Remarks generated successfully." });
            } else {
                setStatus({ type: 'error', text: "Could not extract remarks from the response." });
            }
        }
    } catch (err) {
        console.error("Error during API call:", err);
        setStatus({ type: 'error', text: `An unexpected error occurred: ${err.message}` });
    } finally {
        setLoadingRemarks(false);
    }
}