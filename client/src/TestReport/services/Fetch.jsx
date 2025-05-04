import axios from 'axios';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const fetchParameters = async (data, updateField, setLoading, setStatus) => {
    setLoading(true);

    const { customer, partName, material } = data;

    try {
        const response = await axios.post('/api/testreports/getParameters', {
            customer,
            partName,
            material
        });

        updateField('parameters', response.data.parameters);
        setStatus({ type: 'success', text: 'Parameters fetched successfully!' });
        console.log(response.data.parameters);
    } catch (err) {
        setStatus({ type: 'error', text: err.response?.data?.error });
        console.error('Error connecting to the server', err.response?.data?.error);
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

export const handleCreatePDF = async (reportId, setLoadingpdfId) => {
    setLoadingpdfId(reportId)
    try {
        // 1. Fetch report data by ID
        const { data: report } = await axios.get(`/api/testreports/${reportId}`);
        console.log('report' + report)

        // 2. Generate PDF
        const doc = new jsPDF();

        // Header
        doc.setFontSize(12);
        doc.text("J-199, M.I.D.C, Bhosari, Pune-26", 10, 10);
        doc.text("Web: www.sales@jyotiht.com", 10, 16);
        doc.text("Mob. No.: 779807876/9823143199", 10, 22);
        doc.text("Doc No: JHTPL/QA/F-04", 150, 10);
        doc.text("Rev No: 00/--", 150, 16);
        doc.text("Rev Date: 01.01.2023", 150, 22);

        doc.setFontSize(16);
        doc.text("TEST CERTIFICATE", 105, 32, { align: "center" });

        // Certificate Info
        doc.setFontSize(12);
        doc.text(`Test certificate no: ${report.testCertNo}`, 10, 42);
        doc.text(`Customer Name: ${report.customer}`, 10, 48);
        doc.text(`Part no.: ${report.partNoQty?.[0]?.partNo || ""}`, 10, 54);
        doc.text(`Part name: ${report.partName}`, 10, 60);
        doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 10, 66);
        doc.text(`Material: ${report.material}`, 10, 72);
        doc.text(`Qty.: ${report.partNoQty?.[0]?.qty || ""} Nos`, 10, 78);

        // Parameters Table
        autoTable(doc, {
            startY: 85,
            head: [["Parameter", "Specified", "Actual"]],
            body: report.parameters.map(p => [p.name, p.specified, p.actual]),
            styles: { fontSize: 10 }
        });

        // Hardness Traverse Table
        if (report.hardnessTraverse && Object.keys(report.hardnessTraverse).length > 0) {
            const traverseRows = [];
            // Assuming hardnessTraverse is an object with keys as depth, values as {pos1, pos2}
            Object.entries(report.hardnessTraverse).forEach(([depth, positions]) => {
                traverseRows.push([depth, positions.pos1, positions.pos2]);
            });
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 8,
                head: [["Depth", "Pos1 (HV1)", "Pos2 (HV1)"]],
                body: traverseRows,
                styles: { fontSize: 10 }
            });
        }

        // Surface Hardness of 5 Samples
        if (report.hardnessSamples && report.hardnessSamples.length > 0) {
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 8,
                head: [["Sample No.", ...report.hardnessSamples.map(s => s.sampleNo)]],
                body: [["Surface Hardness (HRC)", ...report.hardnessSamples.map(s => Math.round(s.surfaceHardness))]],
                styles: { fontSize: 10 }
            });
        }

        // Remarks
        doc.text(`Remarks: ${report.remarks || ""}`, 10, doc.lastAutoTable.finalY + 16);

        // Signature
        doc.text("Mahesh Pawar", 10, doc.lastAutoTable.finalY + 32);
        doc.text("Prepared By", 10, doc.lastAutoTable.finalY + 38);

        // 3. Download PDF (auto works on mobile and desktop)
        doc.save(`${report.testCertNo || "TestCertificate"}.pdf`);
    } catch (err) {
        console.error("PDF Generation Error:", err);
        alert(`Failed to generate PDF: ${err.message || err}`);
    } finally {
        setLoadingpdfId(null)
    }
};