import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const ComplaintModal = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        studentClass: "",
        age: "",
        date: "",
        type: "",
        severity: "",
        details: "",
        impact: "",
        action: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setForm({
                name: "",
                studentClass: "",
                age: "",
                date: "",
                type: "",
                severity: "",
                details: "",
                impact: "",
                action: "",
            });
            setError("");
        }
    }, [isOpen]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const generateComplaintId = () => {
        const timestamp = Date.now().toString().slice(-5);
        return `CMP-${new Date().getFullYear()}-${timestamp}`;
    };

    const handleSubmit = () => {
        const { name, studentClass, date, type, severity, details, impact } = form;
        if (!name || !studentClass || !date || !type || !severity || !details || !impact) {
            setError("⚠️ Please fill in all required fields!");
            return;
        }
        const newComplaint = {
            id: generateComplaintId(),
            ...form,
            status: "Pending",
            submittedAt: new Date().toLocaleDateString(),
        };
        onSubmit(newComplaint);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-[#14528B] mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} /> Student Complaint Form
                </h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="font-semibold">Name </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        />
                    </div>

                    {/* Class */}
                    <div>
                        <label className="font-semibold">Class</label>
                        <input
                            type="text"
                            value={form.studentClass}
                            onChange={(e) => handleChange("studentClass", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="font-semibold">Age</label>
                        <input
                            type="number"
                            value={form.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="font-semibold">Date of Complaint </label>
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="font-semibold">Complaint Type </label>
                        <select
                            value={form.type}
                            onChange={(e) => handleChange("type", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        >
                            <option value="">Select</option>
                            <option>Physical Safety</option>
                            <option>Emotions</option>
                            <option>Bullying</option>
                            <option>Staff</option>
                            <option>Learning</option>
                            <option>Facilities</option>
                            <option>Bus</option>
                            <option>Rights</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Severity */}
                    <div>
                        <label className="font-semibold">Severity </label>
                        <select
                            value={form.severity}
                            onChange={(e) => handleChange("severity", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        >
                            <option value="">Select</option>
                            <option>Simple Note</option>
                            <option>Urgent</option>
                            <option>Follow-up</option>
                            <option>Serious</option>
                        </select>
                    </div>

                    {/* Impact */}
                    <div>
                        <label className="font-semibold">Impact</label>
                        <select
                            value={form.impact}
                            onChange={(e) => handleChange("impact", e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mt-1"
                        >
                            <option value="">Select</option>
                            <option>Psychological</option>
                            <option>Physical</option>
                            <option>Academic</option>
                            <option>Social</option>
                        </select>
                    </div>
                </div>

                {/* Complaint Details */}
                <div className="mt-4">
                    <label className="font-semibold">Complaint Details</label>
                    <textarea
                        value={form.details}
                        onChange={(e) => handleChange("details", e.target.value)}
                        rows="3"
                        className="border border-gray-300 rounded p-2 w-full mt-1"
                    />
                </div>

                {/* Expected Action */}
                <div className="mt-4">
                    <label className="font-semibold">Expected Action</label>
                    <textarea
                        value={form.action}
                        onChange={(e) => handleChange("action", e.target.value)}
                        rows="2"
                        className="border border-gray-300 rounded p-2 w-full mt-1"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-l from-[#14528B] via-[#68f5ba] to-[#14528B] text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition-transform"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplaintModal;
