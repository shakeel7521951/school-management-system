// models/FormSubmission.js
import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  approvedByDepartment:{
    type:String,
    required:true,
    default:"pending",
    enum:['pending','approved','rejected']
  },
  approvedByAdmin:{
    type:String,
    required:true,
    default:"pending",
    enum:['pending','approved','rejected']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  rejectNote: {
    type: String,
    default: '',
  },
  ipAddress: String,
  userAgent: String,
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);
export default FormSubmission;
