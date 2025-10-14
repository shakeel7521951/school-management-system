import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    governmentId: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    visitorType: {
        type: String,
        enum: ["parent", "teacher", "student", "other"],
        required: true
    },
    hostDepartment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
