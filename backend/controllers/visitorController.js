import Visitor from "../models/Visitor.js";
import { visitorRequestSubmittedTemplate, visitorStatusUpdateTemplate } from "../utils/emailTemplates.js";
import SendMail from "../utils/SendMail.js";

export const addVisitor = async (req, res) => {
    try {
        const { name, governmentId, reason, visitorType, phone, signature, hostDepartment, email } = req.body;

        if (!name || !governmentId || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Auto-approve if visitorType is "parent"
        const status = visitorType?.toLowerCase() === "parent" ? "approved" : "pending";

        const newVisitor = await Visitor.create({
            name,
            governmentId,
            reason,
            visitorType,
            status,
            phone,
            signature,
            hostDepartment,
            email,
        });

        if (status === "approved") {
            const emailContent = visitorStatusUpdateTemplate(name, "accepted");
            await SendMail(email, emailContent.subject, emailContent.html);
        } else {
            const emailContent = visitorRequestSubmittedTemplate(name);
            await SendMail(email, emailContent.subject, emailContent.html);
        }

        return res.status(201).json({
            message:
                status === "approved"
                    ? "Parent visitor automatically approved and email sent."
                    : "Visitor request submitted successfully. Confirmation email sent.",
            visitor: newVisitor,
        });
    } catch (error) {
        console.error("Error adding visitor:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ createdAt: -1 });
        return res.status(200).json(visitors);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        return res.status(200).json(visitor);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateVisitorStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        if (visitor.email) {
            const emailContent = visitorStatusUpdateTemplate(visitor.name, status);
            await SendMail(visitor.email, emailContent.subject, emailContent.html);
        }

        return res.status(200).json({
            message: "Visitor status updated successfully and email sent.",
            visitor,
        });
    } catch (error) {
        console.error("Error updating visitor status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        return res.status(200).json({ message: "Visitor deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
