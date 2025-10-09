import express from "express";
import { createDepartment, deleteDepartment, departmentStComplaints, departmentTeacherComplaints, editDepartment, getAllDepartments } from "../controllers/DepartmentController.js";
import auth from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

router.post("/create-department",createDepartment);
router.get("/all-departments",getAllDepartments);
router.delete("/delete-department/:id",deleteDepartment);
router.put("/edit-department/:id",editDepartment);
router.get("/departmentComplaints",auth,departmentStComplaints);
router.get("/department-teacher-complaints",auth,departmentTeacherComplaints);
export default router;