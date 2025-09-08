import React from "react";

const ComplaintDetailsSection = ({ formData, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Complaint Details
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Complaint Type */}
        <div>
          <label htmlFor="complaintType" className="block text-sm font-medium mb-1">
            Complaint Type *
          </label>
          <select
            id="complaintType"
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select type</option>
            <option value="academic">Academic</option>
            <option value="facilities">Facilities</option>
            <option value="hr">HR</option>
            <option value="behavior">Student Behavior</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Please describe your complaint in detail"
          />
        </div>
      </div>
    </section>
  );
};

export default ComplaintDetailsSection;
