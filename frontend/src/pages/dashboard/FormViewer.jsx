// components/FormViewer.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Download,
  Printer,
  CheckCircle,
  XCircle,
} from "lucide-react";

const FormViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchFormHTML = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/html-form/${id}`);
        if (!response.ok) throw new Error("Failed to fetch form");

        const html = await response.text();
        setHtmlContent(html);
        setError(null);
      } catch (error) {
        setError("Failed to load form. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormHTML();
  }, [id]);

  // 🔹 Handle Form Submission
  const handleSubmitForm = async (data) => {
    try {
      setSubmissionStatus("submitting");
      const response = await fetch(`${BACKEND_URL}/submitForm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: id,
          formData: data,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setTimeout(() => setSubmissionStatus(null), 3000);
      } else throw new Error("Submission failed");
    } catch {
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-${id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Form</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f8fa] flex items-center justify-center px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104C80] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center text-sm sm:text-base">
            Loading form...
          </p>
        </div>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f8fa] flex items-center justify-center px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center w-full max-w-md">
          <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Error Loading Form
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#104C80] text-white rounded-md hover:bg-[#0d3a61] transition text-sm sm:text-base"
            >
              <Home className="w-4 h-4" /> Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      {/* 🔹 Header */}
      <div className="bg-[#104C80] shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center text-white gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-gray-200 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
            </button>
            <h1 className="text-lg sm:text-xl font-semibold">Form Viewer</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-white text-[#104C80] rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
              title="Download Form"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-white text-[#104C80] rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
              title="Print Form"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Submission Alerts */}
      {submissionStatus === "success" && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md shadow-lg flex items-center gap-2 text-sm sm:text-base">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Form submitted successfully!</span>
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md shadow-lg flex items-center gap-2 text-sm sm:text-base">
          <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Failed to submit form. Please try again.</span>
        </div>
      )}

      {/* 🔹 Form Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <form
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formValues = {};
            for (let [key, value] of formData.entries()) formValues[key] = value;
            handleSubmitForm(formValues);
          }}
        >
          {/* Injected HTML */}
          <div className="prose max-w-full text-sm sm:text-base">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 sm:px-6 py-2 bg-[#104C80] text-white font-medium rounded-md shadow hover:bg-[#0d3a61] transition text-sm sm:text-base"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormViewer;
