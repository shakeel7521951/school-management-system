import TeacherComplaint from "../models/TeacherComplaint.js";

export const createComplaint = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "You must be logged in to submit a complaint" });
    }
    const complaint = new TeacherComplaint({
      ...req.body,
      teacherId: req.user.id,
      status: 'Pending'
    });
    await complaint.save();

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await TeacherComplaint.find().populate("assignedTo", "name").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const teacherComplaints = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "You are not logged in. Please login first" });
    }

    const { id } = req.user;
    const complaints = await TeacherComplaint.find({ teacherId: id });
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: "No Complaint Found!" });
    }

    return res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await TeacherComplaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    return res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await TeacherComplaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const updateData = {};

    if (status) {
      updateData.status = status;
    }

    if (assignedTo && assignedTo.trim() !== "") {
      updateData.assignedTo = assignedTo;
    }

    const complaint = await TeacherComplaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await TeacherComplaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
