import express from "express";
import { createForm, deleteForm, getAllForms, getFormHTML, singleForm, updateForm } from "../controllers/FormsController.js";
import auth from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

router.post("/createForm",auth, createForm);
router.put("/update-form/:id",auth, updateForm);
router.get("/getForms",auth, getAllForms);
router.get("/html-form/:id",auth, getFormHTML);
router.get("/single-form/:id",auth, singleForm);
router.delete("/delete-form/:id",auth, deleteForm);

export default router;