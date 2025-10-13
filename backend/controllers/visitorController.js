import Visitor from "../models/Visitor.js";

export const addVisitor = async (req, res) => {
    try {
        const { name, governmentId, reason, visitorType,phone,signature } = req.body;
        console.log(req.body);
        if (!name || !governmentId || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const status = visitorType?.toLowerCase() === "parent" ? "approved" : "pending";
        const newVisitor = await Visitor.create({
            name,
            governmentId,
            reason,
            visitorType,
            status,
            phone,
            signature
        });

        return res.status(201).json({
            message:
                status === "approved"
                    ? "Parent visitor automatically approved"
                    : "Visitor request submitted successfully",
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

        return res.status(200).json({ message: "Visitor status updated", visitor });
    } catch (error) {
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
