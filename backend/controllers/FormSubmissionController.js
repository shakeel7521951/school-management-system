// controllers/formSubmissionController.js
import FormSubmission from "../models/FormSubmission.js";

// ✅ Store new submission
export const submitForm = async (req, res) => {
  try {
    const { formId, formData } = req.body;

    const submission = new FormSubmission({
      formId,
      formData,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    const { status } = req.body;

    const updatedSubmission = await FormSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
