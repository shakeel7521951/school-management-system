import express from "express";
import { addVisitor, getVisitors } from "../controllers/visitorController";
const router = express.Router();

router.post("/add-visitor",addVisitor);
router.get("/get-visitors",getVisitors);

export default router;