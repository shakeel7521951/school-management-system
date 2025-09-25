import express from "express";
import {
  createStComplaint,
  getAllComplaints,
  getComplaintById,
  deleteComplaint,
  changeComplaintStatus,
} from "../controllers/StComplaintController.js";
import auth from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

router.post("/create-st-complaint",auth, createStComplaint); 
router.get("/get-all-st-complaints", auth,getAllComplaints); 
router.get("/simple-st-complaint/:id",auth, getComplaintById); 
router.delete("/delete-st-complaint/:id",auth, deleteComplaint); 
router.patch("/st-complaint-status/:id",auth, changeComplaintStatus);

export default router;
