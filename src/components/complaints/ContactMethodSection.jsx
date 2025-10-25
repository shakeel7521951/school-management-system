const ContactMethodSection = ({ formData, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Contact Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Method */}
        <div>
          <label
            htmlFor="contactMethod"
            className="block text-sm font-medium mb-1"
          >
            Preferred Contact Method <span className="text-red-500">*</span>
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
          </select>
        </div>

        {/* Contact Time */}
        <div>
          <label
            htmlFor="contactTime"
            className="block text-sm font-medium mb-1"
          >
            Preferred Time
          </label>
          <select
            id="contactTime"
            name="contactTime"
            value={formData.contactTime || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ContactMethodSection;
