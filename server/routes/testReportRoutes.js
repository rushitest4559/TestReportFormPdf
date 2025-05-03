// routes/testreportRoutes.js
import { Router } from 'express';
const router = Router();
import { createTestReport, getAllTestReports, getTestReportById, updateTestReport, deleteTestReport, customerSuggestions, partNameSuggestions, materialSuggestions, getParameters, insertDummyTestReports, deleteAllTestReports } from '../controllers/testReportController.js';

router.post('/', createTestReport);
router.get('/', getAllTestReports);

router.get('/suggestions', customerSuggestions);
router.get('/part-suggestions', partNameSuggestions);
router.get('/material-suggestions', materialSuggestions);
router.post('/getParameters', getParameters)

router.post('/insert-dummy-reports', insertDummyTestReports);
router.delete('/delete-all', deleteAllTestReports);



router.get('/:id', getTestReportById);
router.put('/:id', updateTestReport);
router.delete('/:id', deleteTestReport);

export default router;
