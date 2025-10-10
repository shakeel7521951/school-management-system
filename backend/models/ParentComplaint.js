import mongoose from "mongoose";

const parentComplaintSchema = new mongoose.Schema(
    {
        parentName: {
            type: String,
            required: true,
            trim: true,
        },
        relationToStudent: {
            type: String,
            required: true,
            trim: true,
        },
        studentName: {
            type: String,
            required: true,
            trim: true,
        },
        class: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },
        departmentMessage:{
            type:String
        },
        complaintType: {
            type: String,
            required: true,
            enum: [
                "Safety",
                "Wellbeing",
                "Bullying",
                "Staff",
                "Education",
                "Facilities",
                "Bus",
                "Rights",
                "Other",
            ],
        },
        severity: {
            type: String,
            required: [true, "Severity is required"],
            enum: ["Simple Note", "Urgent", "Follow-up", "Serious"],
        },
        details: {
            type: String,
            required: true,
            trim: true,
        },
        impact: {
            type: String,
            required: [true, "Impact is required"],
            enum: ["Psychological", "Physical", "Academic", "Social"],
        },
        expectedAction: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Review", "Resolved","Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const ParentComplaint = mongoose.model("ParentComplaint", parentComplaintSchema);

export default ParentComplaint;
