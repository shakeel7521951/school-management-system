import express from "express";
import { getFormSubmissions, submitForm } from "../controllers/FormSubmissionController.js";
const router = express.Router();

router.post('/submitForm', submitForm);
router.get('getSubmittedForms/:formId', getFormSubmissions);

export default router;