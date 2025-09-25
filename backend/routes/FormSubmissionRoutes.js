import express from "express";
import { getAllSubmissions, submitForm, updateSubmissionStatus } from "../controllers/FormSubmissionController.js";
import auth from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

router.post('/submitForm',auth, submitForm);
router.get("/submissions", auth,getAllSubmissions);
router.patch("/submissions/:id/status",auth, updateSubmissionStatus);

export default router;