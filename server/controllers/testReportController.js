import TestReport from '../models/TestReport.js';

// Create a test report
export const createTestReport = async (req, res) => {
  try {
    const {
      testCertNo,
      customer,
      partName,
      material,
      partNoQty,
      parameters,
      hardnessTraverse,
      hardnessSamples,
      remarks
    } = req.body;

    // Basic validation (optional but good practice)
    if (!testCertNo || !customer || !partName || !material) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReport = new TestReport({
      testCertNo,
      customer,
      partName,
      material,
      partNoQty,
      parameters,
      hardnessTraverse,
      hardnessSamples,
      remarks
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all test reports
export const getAllTestReports = async (req, res) => {
  try {
    const reports = await TestReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single test report by ID
export const getTestReportById = async (req, res) => {
  try {
    const report = await TestReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a test report
export const updateTestReport = async (req, res) => {
  try {
    const updatedReport = await TestReport.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a test report
export const deleteTestReport = async (req, res) => {
  try {
    const deletedReport = await TestReport.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
