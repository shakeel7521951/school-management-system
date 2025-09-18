// models/FormSubmission.js
import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);
export default FormSubmission;