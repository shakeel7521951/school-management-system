import React from "react";

const ConsentSection = ({ formData, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Consent
      </h2>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          required
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
          I confirm that the information provided is accurate and I consent to
          the processing of this complaint for resolution purposes.
        </label>
      </div>
    </section>
  );
};

export default ConsentSection;
