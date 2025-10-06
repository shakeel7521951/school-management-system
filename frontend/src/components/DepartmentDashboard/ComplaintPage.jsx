import React, { useState } from "react";

const ComplaintPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "General",
        complaint: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Complaint Submitted:", formData);
        setSubmitted(true);

        // TODO: send formData to backend API here
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Submit a Complaint</h1>

            {submitted ? (
                <div className="p-4 bg-green-50 border border-green-300 text-green-700 rounded-md">
                    ✅ Your complaint has been submitted successfully.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Complaint Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>General</option>
                            <option>Academic</option>
                            <option>Staff</option>
                            <option>Technical</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Complaint Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Complaint
                        </label>
                        <textarea
                            name="complaint"
                            value={formData.complaint}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit Complaint
                    </button>
                </form>
            )}
        </div>
    );
};

export default ComplaintPage;
