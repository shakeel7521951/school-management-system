import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        teacherId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        employeeName: {
            type: String,
            required: true,
            trim: true,
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            required: true,
        },
        impact: {
            type: String,
            required: true,
        },
        expectedAction: {
            type: String,
            required: true,
            trim: true,
        },
        details: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
    },
    { timestamps: true }
);

const TeacherComplaint = mongoose.model("teacherComplaint", complaintSchema);

export default TeacherComplaint;
