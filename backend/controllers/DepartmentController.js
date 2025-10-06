import Department from "../models/Department.js";

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