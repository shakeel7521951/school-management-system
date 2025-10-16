import Department from "../models/Department.js";
import StComplaint from "../models/StComplaint.js";
import TeacherComplaint from "../models/TeacherComplaint.js";
import User from "../models/User.js";

export const createDepartment = async (req, res) => {
    try {
        const { name,description } = req.body;
        const existing = await Department.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: "Department already exists" });
        }
        const department = new Department({ name, description });
        await department.save();
        res.status(201).json({ message: "Department created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ createdAt: -1 });
        return res.status(200).json({ departments })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        await Department.findByIdAndDelete(id);
        return res.status(200).json({ message: "Department Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDepartment = await Department.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if(!updateDepartment){
            return res.status(400).json({message:"Something went wrong.Try again later"});
        }
        return res.status(200).json({message:"Department updated successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const departmentStComplaints = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("department", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.department) {
      return res.status(400).json({ message: "User has no assigned department" });
    }
    const complaints = await StComplaint.find({
      assignedTo: user.department._id,
    })
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });
    if (complaints.length === 0) {
      return res.status(200).json({ message: "No complaints assigned to this department yet." });
    }
    res.status(200).json({
      message: `Complaints assigned to ${user.department.name}`,
      department: user.department.name,
      complaints,
    });
  } catch (error) {
    console.error("Error fetching department complaints:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const  departmentTeacherComplaints = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("department", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.department) {
      return res.status(400).json({ message: "User has no assigned department" });
    }
    const complaints = await TeacherComplaint.find({
      assignedTo: user.department._id,
    })
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });
    if (complaints.length === 0) {
      return res.status(200).json({ message: "No complaints assigned to this department yet." });
    }
    res.status(200).json({
      message: `Complaints assigned to ${user.department.name}`,
      department: user.department.name,
      complaints,
    });
  } catch (error) {
    console.error("Error fetching department complaints:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};