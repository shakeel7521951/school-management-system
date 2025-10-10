import ParentComplaint from "../models/ParentComplaint.js";

export const createParentComplaint = async (req, res) => {
  try {
    const complaint = new ParentComplaint(req.body);
    await complaint.save();
    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllParentComplaints = async (req, res) => {
  try {
    const complaints = await ParentComplaint.find().populate('assignedTo','name').sort({ createdAt: -1 });
    return res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteParentComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await ParentComplaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changeComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, departmentMessage } = req.body;
    const complaint = await ParentComplaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    const validStatuses = ["Pending", "In Review", "Resolved","Rejected"];
    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      complaint.status = status;
    }
    if (assignedTo) {
      complaint.assignedTo = assignedTo;
    }
    if (departmentMessage) {
      complaint.departmentMessage = departmentMessage;
    }

    await complaint.save();

    return res.status(200).json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
