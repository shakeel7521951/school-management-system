import express from "express";
import { createForm, deleteForm, getAllForms, getFormHTML, singleForm, updateForm } from "../controllers/FormsController.js";
// import auth from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

router.post("/createForm", createForm);
router.put("/update-form/:id", updateForm);
router.get("/getForms", getAllForms);
router.get("/html-form/:id", getFormHTML);
router.get("/single-form/:id", singleForm);
router.delete("/delete-form/:id", deleteForm);

export default router;