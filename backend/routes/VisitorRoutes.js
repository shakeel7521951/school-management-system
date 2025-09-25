import express from "express";
import { addVisitor, deleteVisitor, getVisitorById, getVisitors, updateVisitorStatus } from "../controllers/visitorController.js";
const router = express.Router();

router.post("/add-visitor",addVisitor);
router.get("/get-visitors",getVisitors);
router.get("/get-visitor-by-id/:id",getVisitorById);
router.patch("/update-visitor-status/:id",updateVisitorStatus);
router.delete("/delete-visitor/:id",deleteVisitor);

export default router;