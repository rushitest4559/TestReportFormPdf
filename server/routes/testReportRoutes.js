// routes/testreportRoutes.js
import { Router } from 'express';
const router = Router();
import { createTestReport, getAllTestReports, getTestReportById, updateTestReport, deleteTestReport } from '../controllers/testReportController.js';

router.post('/', createTestReport);
router.get('/', getAllTestReports);
router.get('/:id', getTestReportById);
router.put('/:id', updateTestReport);
router.delete('/:id', deleteTestReport);

export default router;
