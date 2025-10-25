import React from "react";

const ReferenceSection = ({ formData, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Reference & Supporting Information
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="involvedParties" className="block text-sm font-medium mb-1">
            Involved Parties
          </label>
          <input
            type="text"
            id="involvedParties"
            name="involvedParties"
            value={formData.involvedParties}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="witnesses" className="block text-sm font-medium mb-1">
            Witnesses
          </label>
          <input
            type="text"
            id="witnesses"
            name="witnesses"
            value={formData.witnesses}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="documents" className="block text-sm font-medium mb-1">
            Supporting Documents
          </label>
          <input
            type="file"
            id="documents"
            name="documents"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border file:rounded-md file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </section>
  );
};

export default ReferenceSection;
