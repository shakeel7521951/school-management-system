import express from "express";
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments } from "../controllers/DepartmentController.js";
const router = express.Router();

router.post("/create-department",createDepartment);
router.get("/all-departments",getAllDepartments);
router.delete("/delete-department/:id",deleteDepartment);
router.put("/edit-department/:id",editDepartment);

export default router;