import express from "express";
import {
  newRegistration,
  getRegistrations,
  getRegistrationById,
  updateStatus,
  deleteRegistration,
} from "../controllers/RegistrationController.js";

const router = express.Router();

router.post("/create-new-registration", newRegistration); 
router.get("/get-all-registrations", getRegistrations);
router.get("/get-single-registration/:id", getRegistrationById);
router.put("/update-registration-status/:id", updateStatus); 
router.delete("/delete-registration/:id", deleteRegistration);

export default router;
