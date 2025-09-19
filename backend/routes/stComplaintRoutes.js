import express from "express";
import {
  createStComplaint,
  getAllComplaints,
  getComplaintById,
  deleteComplaint,
  changeComplaintStatus,
} from "../controllers/StComplaintController.js";

const router = express.Router();

router.post("/create-st-complaint", createStComplaint); 
router.get("/get-all-st-complaints", getAllComplaints); 
router.get("/simple-st-complaint/:id", getComplaintById); 
router.delete("/delete-st-complaint/:id", deleteComplaint); 
router.patch("/st-complaint-status/:id", changeComplaintStatus);

export default router;
