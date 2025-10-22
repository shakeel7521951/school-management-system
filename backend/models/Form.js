import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  fillDuration: {
    type: Number,
    required: true,
  },
  submissionType: {
    type: String,
    enum: ['single', 'multiple'],
    default: 'single'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
});

const Form = mongoose.model('Form', FormSchema);
export default Form;