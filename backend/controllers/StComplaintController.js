import StComplaint from "../models/StComplaint.js";

export const createStComplaint = async (req, res) => {
  try {
    const { complaintId, name, studentClass, age, date, type, severity, details, impact, action } = req.body;

    if (!name || !studentClass || !date || !type || !severity || !details || !impact) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const newComplaint = new StComplaint({
      complaintId,
      name,
      studentClass,
      age,
      date,
      type,
      severity,
      details,
      impact,
      action,
      status: "Pending",
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await StComplaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await StComplaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await StComplaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changeComplaintStatus = async (req, res) => {
  console.log("api is running.....")
  try {
    const { status,assignedTo } = req.body; 
    console.log(req.body);
    if (!["Pending", "Resolved", "In Progress"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await StComplaint.findByIdAndUpdate(
      req.params.id,
      { status,assignedTo },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Status updated successfully", complaint });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};
