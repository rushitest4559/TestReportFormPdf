// backend/controllers/customerController.js
import Customer from '../models/Customer.js';

export async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createCustomer(req, res) {
  const customer = new Customer(req.body);
  if(!customer.customer) {
    return res.status(401).json({message: 'please enter at least customer name'})
  }
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getCustomerById(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateCustomer(req, res) {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteCustomer(req, res) {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getCustomerSuggestions = async (req, res) => {
  const query = req.query.q || '';
  try {
    const suggestions = await Customer.find({
      customer: { $regex: `^${query}`, $options: 'i' }
    })
      .limit(5)
      .select('customer -_id');

    res.json(suggestions.map(c => c.customer));
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    res.status(500).json({ message: 'server error' });
  }
};

// Get part name suggestions
export const getPartNameSuggestions = async (req, res) => {
  const query = req.query.q || '';
  const customer = req.query.customer || '';

  try {
    const suggestions = await Customer.aggregate([
      { $match: { customer: customer } },  // Match the selected customer
      { $unwind: "$parts" },
      { $match: { "parts.partName": { $regex: `^${query}`, $options: 'i' } } },
      { $group: { _id: "$parts.partName" } },
      { $limit: 5 }
    ]);

    res.json(suggestions.map(s => s._id));
  } catch (err) {
    console.error('Error fetching part name suggestions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get material suggestions
export const getMaterialSuggestions = async (req, res) => {
  const query = req.query.q || '';
  const customer = req.query.customer || '';

  try {
    const suggestions = await Customer.aggregate([
      { $match: { customer: customer } },  // Match the selected customer
      { $unwind: "$parts" },
      { $match: { "parts.material": { $regex: `^${query}`, $options: 'i' } } },
      { $group: { _id: "$parts.material" } },
      { $limit: 5 }
    ]);

    res.json(suggestions.map(s => s._id));
  } catch (err) {
    console.error('Error fetching material suggestions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getParameters = async (req, res) => {
  try {
    const { customer, partName, material } = req.body;

    // Validate input
    if (!customer || !partName || !material) {
      return res.status(400).json({ 
        message: 'Missing required fields: customer, partName, and material are required' 
      });
    }

    // Find document matching criteria
    const result = await Customer.findOne({
      customer,
      'parts.partName': partName,
      'parts.material': material
    }, {
      'parts.$': 1 // Project only the matching part
    });

    if (!result || !result.parts || result.parts.length === 0) {
      return res.status(404).json({ 
        message: 'No matching part found for the provided criteria' 
      });
    }

    // Extract parameters from the matched part
    const parameters = result.parts[0].parameters;

    res.status(200).json({
      success: true,
      parameters
    });

  } catch (error) {
    console.error('Error fetching parameters:', error);
    res.status(500).json({ 
      message: error.message 
    });
  }
};