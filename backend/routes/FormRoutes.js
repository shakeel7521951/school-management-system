import express from "express";
import { createForm, getAllForms, singleForm } from "../controllers/FormsController.js";
const router = express.Router();

router.post("/createForm", createForm);
router.get("/getForms", getAllForms);
router.get("/get-single-form/:id", singleForm);

export default router;