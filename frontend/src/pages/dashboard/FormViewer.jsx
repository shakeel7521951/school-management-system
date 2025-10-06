// components/FormViewer.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, redirect } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Download,
  Printer,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FormViewer = () => {
  const location = useLocation();
  const timer = location.state?.timer;
  const { id } = useParams();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  useEffect(() => {
    const fetchFormHTML = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/html-form/${id}`, {
          responseType: "text",
          withCredentials: true
        });

        setHtmlContent(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to load form. Please try again later.");
        console.error("Error fetching HTML form:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchFormHTML();
  }, [id]);
  const handleSubmitForm = async (data) => {
    try {
      setSubmissionStatus("submitting");

      const response = await axios.post(
        `${BACKEND_URL}/submitForm`,
        {
          formId: id,
          formData: data,
          submittedAt: new Date().toISOString(),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSubmissionStatus("success");
      alert("Form submitted successfully!");
      navigate(-1);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      console.error("Error submitting form:", message);

      if (message.includes("expired")) {
        toast.error("This form is no longer available — the fill duration has expired.");
        navigate(-1)
      } else {
        toast.error(message);
        navigate(-1);
      }

      setSubmissionStatus(message);
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
      <div className="min-h-screen bg-[#f5f8fa] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104C80] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f8fa] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Form
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-[#104C80] text-white rounded-md hover:bg-[#0d3a61] transition"
            >
              <Home className="w-4 h-4" /> Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8fa] rounded-lg">
      {/* 🔹 Header */}
      <div className="bg-[#104C80] shadow-sm border-b rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-gray-200 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h1 className="text-xl font-semibold">Form Viewer</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-6">
              {/* Show the timer value for this form */}
              <p>
                Remaining Time: <span className="font-medium">{timer?.[id]?.slice(0, 7)}</span>
              </p>

            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-white text-[#104C80] rounded-md shadow hover:bg-gray-100 transition"
              title="Download Form"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-white text-[#104C80] rounded-md shadow hover:bg-gray-100 transition"
              title="Print Form"
            >
              <Printer className="w-4 h-4" /> Print
            </button>

          </div>
        </div>
      </div>

      {/* 🔹 Submission Alerts */}
      {submissionStatus === "success" && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Form submitted successfully!</span>
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          <span>Failed to submit form. Please try again.</span>
        </div>
      )}

      {/* 🔹 Form Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <form
          className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formValues = {};
            for (let [key, value] of formData.entries()) formValues[key] = value;
            handleSubmitForm(formValues);
          }}
        >
          {/* Injected HTML */}
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#104C80] text-white font-medium rounded-md shadow hover:bg-[#0d3a61] transition"
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
