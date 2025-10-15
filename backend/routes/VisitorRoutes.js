import express from "express";
import { addVisitor, deleteVisitor, getVisitorById, getVisitors, updateVisitorStatus } from "../controllers/visitorController.js";
import auth from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

router.post("/add-visitor", addVisitor);
router.get("/get-visitors",auth, getVisitors);
router.get("/get-visitor-by-id/:id",auth, getVisitorById);
router.patch("/update-visitor-status/:id",auth, updateVisitorStatus);
router.delete("/delete-visitor/:id",auth, deleteVisitor);

export default router;