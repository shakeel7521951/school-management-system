// controllers/formSubmissionController.js
import Form from "../models/Form.js";
import FormSubmission from "../models/FormSubmission.js";

// Store new submission
export const submitForm = async (req, res) => {
  try {
    const { formId, formData } = req.body;
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    
    const createdAt = new Date(form.createdAt);
    const expiryDate = new Date(createdAt.getTime() + form.fillDuration * 24 * 60 * 60 * 1000);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      return res.status(400).json({
        message: "Form has expired. You can no longer submit responses.",
        expired: true,
      });
    }
    if(form.submissionType === 'single'){
      const existingSubmission = await FormSubmission.findOne({ user: id, formId });
      if (existingSubmission) {
        return res.status(400).json({
          message: "You have already submitted this form.",
          expired: false,
        });
      }
    }
    
    const submission = new FormSubmission({
      user: id,
      formId,
      formData,
      userAgent: req.get("User-Agent"),
    });

    const savedSubmission = await submission.save();

    res.status(201).json({
      message: "Form submitted successfully",
      submission: savedSubmission,
      expired: false,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: error.message });
  }
};

export const submissionsApprovedByDepartment = async(req,res)=>{
  try {
    const submissions = await FormSubmission.find({approvedByDepartment:'approved'});
    if(submissions.length===0){
      return res.status(404).json({message:"No submissions approved by department found"});
    }
    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({message:"Internal server error"});
  }
}

// ✅ Get all submissions (optionally filter by formId)
export const getAllSubmissions = async (req, res) => {
  try {
    const { formId } = req.query;
    const filter = formId ? { formId } : {};

    const submissions = await FormSubmission.find(filter)
      .populate("formId", "title")
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Update submission status
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    const updateData = { status };
    const user = req.user;
    if (status === "Rejected" && note) {
      updateData.rejectNote = note;
    }
    if(user.role !== "admin"){
      updateData.approvedByDepartment = status.toLowerCase();
    }

    if (user.role === "admin") {
      updateData.approvedByAdmin = status.toLowerCase();
    }
    const updatedSubmission = await FormSubmission.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    return res.status(200).json("Status update successfully",updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};