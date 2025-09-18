import FormSubmission from "../models/FormSubmission.js";

export const submitForm = async (req, res) => {
  try {
    const { formId, formData } = req.body;
    
    const submission = new FormSubmission({
      formId,
      formData,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFormSubmissions = async (req, res) => {
  try {
    const { formId } = req.params;
    const submissions = await FormSubmission.find({ formId }).sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};