import express from "express";
import { addVisitor, deleteVisitor, getVisitorById, getVisitors, updateVisitorStatus } from "../controllers/visitorController.js";
const router = express.Router();

router.post("/add-visitor",addVisitor);
router.get("/get-visitors",getVisitors);
router.get("/get-visitor-by-id",getVisitorById);
router.get("/update-visitor-status",updateVisitorStatus);
router.delete("/delete-visitor",deleteVisitor);

export default router;