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
    const {
      customer,
      partName,
      material,
      startDate,
      endDate,
      page = 1,
      limit = 5,
    } = req.query;

    // Build the filter object dynamically
    const filter = {};

    if (customer) filter.customer = { $regex: new RegExp(customer, 'i') };
    if (partName) filter.partName = { $regex: new RegExp(partName, 'i') };
    if (material) filter.material = { $regex: new RegExp(material, 'i') };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include entire end date
        filter.createdAt.$lte = end;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reports = await TestReport.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await TestReport.countDocuments(filter);

    res.json({
      reports,
      hasMore: skip + reports.length < total,
    });
  } catch (err) {
    console.error('Error fetching test reports:', err);
    res.status(500).json({ message: 'Server error' });
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


export const getParameters = async (req, res) => {
  try {
      const { customer, partName, material } = req.query;

      if (!customer || !partName || !material) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const latestReport = await TestReport.findOne({ customer, partName, material })
          .sort({ createdAt: -1 })
          .select('parameters')
          .lean();

      if (!latestReport) {
          return res.status(404).json({ error: 'No matching test reports found' });
      }

      res.json({ parameters: latestReport.parameters || [] });
  } catch (error) {
      console.error('Error fetching parameters:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


export const customerSuggestions = async (req, res) => {
  try {
    const q = req.query.q || '';
    if (q.length < 2) return res.json([]);

    // Find unique customers that match the query (case-insensitive)
    const customers = await TestReport.distinct('customer', {
      customer: { $regex: q, $options: 'i' }
    });

    res.json(customers);
  } catch (err) {
    console.error('Customer suggestions error:', err);
    res.status(500).json([]);
  }
};

export const partNameSuggestions = async (req, res) => {
  try {
    const q = req.query.q || '';
    const customer = req.query.customer;
    if (q.length < 2 || !customer) return res.json([]);

    // Find unique part names for the selected customer
    const partNames = await TestReport.distinct('partName', {
      customer,
      partName: { $regex: q, $options: 'i' }
    });

    res.json(partNames);
  } catch (err) {
    console.error('Part name suggestions error:', err);
    res.status(500).json([]);
  }
};

export const materialSuggestions = async (req, res) => {
  try {
    const q = req.query.q || '';
    const customer = req.query.customer;
    const partName = req.query.partName;
    if (q.length < 2 || !customer || !partName) return res.json([]);

    // Find unique materials for the selected customer and part name
    const materials = await TestReport.distinct('material', {
      customer,
      partName,
      material: { $regex: q, $options: 'i' }
    });

    res.json(materials);
  } catch (err) {
    console.error('Material suggestions error:', err);
    res.status(500).json([]);
  }
};

// Function to generate random dummy data
const generateRandomTestReport = () => {
  // Common values from PDF
  const customers = ['Omkar Industries', 'Precision Engineering', 'Bearing Solutions Corp', 'Auto Components Ltd'];
  const partNames = [
      'Bearing Head (245KVA SMART)',
      'Gear Shaft Assembly',
      'Camshaft Component',
      'Differential Housing'
  ];
  const materials = ['20MnCr5', '16MnCr5', 'EN8', 'SAE 4140'];
  
  // Random helpers
  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomCaseDepth = () => (0.5 + Math.random() * 0.3).toFixed(2);
  const randomHRC = (min, max) => randomInRange(min, max);
  
  // Generate hardness traverse data
  const hardnessTraverse = [];
  let baseHV = 720;
  for(let distance = 0.1; distance <= 0.9; distance += 0.1) {
      hardnessTraverse.push({
          distance: distance.toFixed(2),
          hardness: baseHV - Math.random() * 20 - (distance * 100)
      });
  }
  
  // Generate surface hardness samples
  const surfaceHardnessSamples = Array.from({length: 5}, () => ({
      sampleNo: randomInRange(1, 100),
      surfaceHardness: randomHRC(58, 61) // Mostly 59-60 as in PDF
  }));

  return {
      testCertNo: `JHTPL/${(Math.random() * 1000).toFixed(3)}/${new Date().getFullYear()}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      partName: partNames[Math.floor(Math.random() * partNames.length)],
      material: materials[Math.floor(Math.random() * materials.length)],
      partNoQty: [{
          partNo: `${randomInRange(400, 499)}-${randomInRange(10000, 19999)}`,
          qty: randomInRange(100, 300)
      }],
      parameters: [
          { name: 'Heat Treatment', specified: 'CHT', actual: 'CHT' },
          { 
              name: 'Surface Hardness', 
              specified: '56-60 HRC (615±85 Hv30)', 
              actual: `${randomHRC(59, 60)} HRC`
          },
          { 
              name: 'Core Hardness', 
              specified: 'NA', 
              actual: `${randomHRC(45, 47)} HRC`
          },
          { 
              name: 'Case depth', 
              specified: '0.50-0.80 mm (cut off 550 HV1)', 
              actual: `${randomCaseDepth()} mm`
          },
          { 
              name: 'Microstructure', 
              specified: 'Case: Tempered martensite, RA<08%; Core: Low carbon tempered Martensite',
              actual: 'Case: Fine Tempered martensite; Core: Low carbon tempered Martensite'
          }
      ],
      hardnessTraverse,
      hardnessSamples: surfaceHardnessSamples,
      remarks: Math.random() > 0.2 ? 'Accepted - Component meets all specifications' : 'Pending review'
  };
};


// Endpoint to generate and insert 1000 dummy test reports
export const insertDummyTestReports = async (req, res) => {
  try {
      const dummyReports = [];
      for (let i = 0; i < 1000; i++) {
          dummyReports.push(generateRandomTestReport());
      }

      // Insert the 1000 dummy test reports into the database
      await TestReport.insertMany(dummyReports);

      res.status(200).json({ message: '1000 dummy test reports inserted successfully' });
  } catch (error) {
      console.error('Error inserting dummy test reports:', error);
      res.status(500).json({ message: 'Error inserting dummy test reports' });
  }
};

export const deleteAllTestReports = async (req, res) => {
  try {
    await TestReport.deleteMany({});
    res.json({ message: 'All test reports deleted successfully' });
  } catch (err) {
    console.error('Error deleting all test reports:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
