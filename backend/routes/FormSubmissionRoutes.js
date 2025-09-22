import express from "express";
import { getAllSubmissions, submitForm, updateSubmissionStatus } from "../controllers/FormSubmissionController.js";
const router = express.Router();

router.post('/submitForm', submitForm);
router.get("/submissions", getAllSubmissions);
router.patch("/submissions/:id/status", updateSubmissionStatus);

export default router;