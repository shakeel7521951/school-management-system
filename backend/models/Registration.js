import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    child_name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
    id_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: true,
      trim: true,
    },
    father_mobile: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid mobile number"],
    },
    father_job: {
      type: String,
      trim: true,
    },
    mother_name: {
      type: String,
      required: true,
      trim: true,
    },
    mother_mobile: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid mobile number"],
    },
    mother_job: {
      type: String,
      trim: true,
    },
    home_phone: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    previous_school: {
      type: String,
      trim: true,
    },
    medical_condition: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    medical_details: {
      type: String,
      trim: true,
    },
    declarer_name: {
      type: String,
      required: true,
      trim: true,
    },
    signature: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
