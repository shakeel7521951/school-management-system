import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
  teacherComplaints,
} from "../controllers/TeacherController.js";
import auth from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.post("/create-teacher-complaint",auth, createComplaint);
router.get("/get-all-teacher-complaints",auth, getComplaints);
router.get("/get-teacher-complaints",auth, teacherComplaints);
router.get("/get-teacher-complaint/:id", getComplaintById);
router.put("/update-teacher-complaint/:id",auth, updateComplaint);
router.patch("/update-teacher-complaint-status/:id",auth, updateComplaintStatus);
router.delete("/delete-teacher-complaint/:id",auth, deleteComplaint);

export default router;
