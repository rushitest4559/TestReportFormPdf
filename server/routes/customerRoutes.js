// backend/routes/customerRoutes.js
import { Router } from 'express';
const router = Router();
import { createCustomer, updateCustomer, deleteCustomer, getAllCustomers, getCustomerById, getMaterialSuggestions, getPartNameSuggestions, getParameters } from '../controllers/customerController.js';
import { getCustomerSuggestions } from '../controllers/customerController.js';
// import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

// Protect all customer routes, only authenticated users can access
// router.use(authenticateToken);
router.get('/suggestions', getCustomerSuggestions);
router.get('/part-suggestions', getPartNameSuggestions);
router.get('/material-suggestions', getMaterialSuggestions);
router.post('/getParameters', getParameters);
// Only admins can create, update, and delete customers
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/', getAllCustomers); // Allow all authenticated users to view
router.get('/:id', getCustomerById); // Allow all authenticated users to view


export default router;