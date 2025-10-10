// models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Physical Safety",
        "Emotions",
        "Bullying",
        "Staff",
        "Learning",
        "Facilities",
        "Bus",
        "Rights",
        "Other",
      ],
      required: true,
    },
    severity: {
      type: String,
      enum: ["Simple Note", "Urgent", "Follow-up", "Serious"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      enum: ["Psychological", "Physical", "Academic", "Social"],
      required: true,
    },
    action: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "In Progress"],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    departmentMessage: {
      type: String
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const StComplaint = mongoose.model("Complaint", complaintSchema);

export default StComplaint;