import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateParentComplaintMutation } from "../redux/slices/ParentComplaintApi";
import { useNavigate } from "react-router-dom";

const ParentComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: "",
    relationToStudent: "",
    studentName: "",
    class: "",
    date: "",
    complaintType: "",
    severity: "",
    details: "",
    impact: "",
    expectedAction: "",
  });

  const [createParentComplaint, { isLoading }] = useCreateParentComplaintMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createParentComplaint(formData).unwrap();

      toast.success("Complaint submitted successfully!", {
        position: "top-right",
        theme: "colored",
      });
      navigate(-1)
      setFormData({
        parentName: "",
        relationToStudent: "",
        studentName: "",
        class: "",
        date: "",
        complaintType: "",
        severity: "",
        details: "",
        impact: "",
        expectedAction: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(error?.data?.message || "Failed to submit complaint", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 border-t-4 border-[#104c80]">
        <h2 className="text-3xl font-bold text-[#104c80] mb-6 text-center">
          Parent Complaint Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Parent Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Parent Name
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Relation to Student
              </label>
              <input
                type="text"
                name="relationToStudent"
                value={formData.relationToStudent}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>
          </div>

          {/* Student Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Class
              </label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>
          </div>

          {/* Complaint Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Date of Complaint
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Complaint Type
              </label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">Select Type</option>
                <option value="Safety">Safety</option>
                <option value="Wellbeing">Wellbeing</option>
                <option value="Bullying">Bullying</option>
                <option value="Staff">Staff</option>
                <option value="Education">Education</option>
                <option value="Facilities">Facilities</option>
                <option value="Bus">Bus</option>
                <option value="Rights">Rights</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Impact and Severity */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Impact on Student
              </label>
              <select
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">Select Impact</option>
                <option value="Psychological">Psychological</option>
                <option value="Physical">Physical</option>
                <option value="Academic">Academic</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Severity
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#104c80]"
              >
                <option value="">Select Severity</option>
                <option value="Simple Note">Simple Note</option>
                <option value="Urgent">Urgent</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Serious">Serious</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Complaint Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe the complaint..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
            ></textarea>
          </div>

          {/* Expected Action */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Expected Action from School
            </label>
            <textarea
              name="expectedAction"
              value={formData.expectedAction}
              onChange={handleChange}
              rows="3"
              placeholder="What do you expect the school to do?"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#104c80]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-400" : "bg-[#104c80] hover:bg-[#0d3a63]"
              } text-white font-semibold py-3 px-10 rounded-xl transition duration-300`}
            >
              {isLoading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ParentComplaintForm;
