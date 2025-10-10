import express from "express";
import { changeComplaintStatus, createParentComplaint, deleteParentComplaint, getAllParentComplaints } from "../controllers/parentComplaintController.js";
const router = express.Router();

router.post("/create-parent-complaint",createParentComplaint);
router.get("/all-parent-complaints",getAllParentComplaints);
router.put("/update-parent-complaint-status/:id",changeComplaintStatus);
router.delete("/delete-parent-complaint/:id",deleteParentComplaint);

export default router;