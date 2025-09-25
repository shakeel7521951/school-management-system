import React from "react";

const RegistrationForm = () => {
    return (
        <div className="w-full bg-gradient-to-r from-blue-50 via-white to-pink-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl border border-gray-100">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#1c60a3] mb-10">
                    Student Registration Form
                </h2>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Registration Date", type: "date", name: "registration_date" },
                        { label: "Child’s Name", type: "text", name: "child_name" },
                        { label: "Age", type: "number", name: "age" },
                        { label: "Nationality", type: "text", name: "nationality" },
                        { label: "Date of Birth", type: "date", name: "dob" },
                        { label: "Home Phone", type: "tel", name: "home_phone" },
                        { label: "Mother’s Mobile", type: "tel", name: "mother_mobile" },
                        { label: "Father’s Mobile", type: "tel", name: "father_mobile" },
                        { label: "Personal ID Number", type: "text", name: "id_number" },
                        { label: "Father’s Name", type: "text", name: "father_name" },
                        { label: "Mother’s Name", type: "text", name: "mother_name" },
                        { label: "Father’s Occupation", type: "text", name: "father_job" },
                        { label: "Mother’s Occupation", type: "text", name: "mother_job" },
                        { label: "Previous School", type: "text", name: "previous_school" },
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block font-semibold text-gray-700 mb-2">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={`Enter ${field.label}`}
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#1c60a3] focus:border-[#1c60a3] outline-none transition"
                            />
                        </div>
                    ))}

                    {/* Medical Section */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block font-semibold text-gray-700 mb-2">
                            Does your child suffer from any medical condition?
                        </label>
                        <select
                            name="medical_condition"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#1c60a3] focus:border-[#1c60a3] outline-none transition"
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                        <textarea
                            name="medical_details"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg mt-3 focus:ring-2 focus:ring-[#1c60a3] focus:border-[#1c60a3] outline-none transition"
                            placeholder="If yes, please explain and attach reports"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Declaration */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block font-semibold text-gray-700 mb-2">
                            I hereby confirm the above information is correct
                        </label>
                        <input
                            type="text"
                            name="declarer_name"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#1c60a3] focus:border-[#1c60a3] outline-none transition mb-3"
                        />
                        <input
                            type="text"
                            name="signature"
                            placeholder="Signature"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#1c60a3] focus:border-[#1c60a3] outline-none transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 text-center mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-gradient-to-r from-[#1c60a3] to-[#3b82f6] hover:from-[#184a7d] hover:to-[#2563eb] text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
