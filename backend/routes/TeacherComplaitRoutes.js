import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/TeacherController.js";

const router = express.Router();

router.post("/create-teacher-complaint", createComplaint);
router.get("/get-teacher-complaints", getComplaints);
router.get("/get-teacher-complaint/:id", getComplaintById);
router.put("/update-teacher-complaint/:id", updateComplaint);
router.patch("/update-teacher-complaint-status/:id", updateComplaintStatus);
router.delete("/delete-teacher-complaint/:id", deleteComplaint);

export default router;
