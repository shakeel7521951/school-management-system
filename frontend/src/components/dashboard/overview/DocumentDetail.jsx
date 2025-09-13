import { useState } from "react";
import {
  Calendar,
  FolderOpen,
  User,
  Eye,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Document, Page, pdfjs } from "react-pdf";
// ✅ Import styles to fix warnings
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Use worker from /public
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// PDF file (must be in public/)
const pdfFile = "/Sadiq_Resume.pdf";

const StudentDetail = () => {
  const [students] = useState([
    { id: 1, name: "Sadiq Hussain", status: "Approved", date: "2025-09-07" },
    { id: 2, name: "Fatima Zahra", status: "Approved", date: "2025-08-25" },
    { id: 3, name: "Mohammed Ali", status: "Pending", date: "2025-08-12" },
    { id: 4, name: "Aisha Siddiqui", status: "Approved", date: "2025-07-30" },
    { id: 5, name: "Omar Farooq", status: "Pending", date: "2025-07-18" },
    { id: 6, name: "Maryam Noor", status: "Approved", date: "2025-07-05" },
    { id: 7, name: "Bilal Hussain", status: "Pending", date: "2025-06-22" },
    { id: 8, name: "Khadija Yusuf", status: "Approved", date: "2025-06-10" },
    { id: 9, name: "Yusuf Rahman", status: "Pending", date: "2025-05-28" },
    { id: 10, name: "Hafsa Khan", status: "Approved", date: "2025-05-15" },
    { id: 11, name: "Ibrahim Malik", status: "Pending", date: "2025-04-30" },
    { id: 12, name: "Zainab Ahmed", status: "Approved", date: "2025-04-12" },
  ]);

  const [openPdf, setOpenPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleDownload = (student) => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = `${student.name}_record.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${student.name}'s record...`);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const nextPage = () => pageNumber < numPages && setPageNumber(pageNumber + 1);
  const prevPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1);

  return (
    <div className="py-6 bg-white min-h-screen md:max-w-5xl md:ms-[24%]">
      <Toaster position="top-center" />
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="text-indigo-600" size={28} />
          <h1 className="text-2xl font-bold text-[#1a4480]">Student Records</h1>
        </div>
        <p className="text-sm text-gray-500">{students.length} students</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="w-full rounded-2xl shadow-sm border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-gray-300 transition flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl flex items-center justify-center ${
                  student.status === "Approved"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                <User size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">
                  {student.name}
                </h3>
                <p
                  className={`text-sm font-medium ${
                    student.status === "Approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {student.status}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                <Calendar size={14} />
                <span>{student.date}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenPdf(true)}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => handleDownload(student)}
                className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {openPdf && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[45%] h-[90%] overflow-auto relative flex flex-col">
            <button
              onClick={() => setOpenPdf(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition z-50"
            >
              <X size={20} />
            </button>
            <div className="flex-1 flex flex-col items-center overflow-auto">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            {numPages && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={prevPage}
                  disabled={pageNumber <= 1}
                  className="px-3 py-1 flex items-center gap-1 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <span className="text-sm text-gray-600">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="px-3 py-1 flex items-center gap-1 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
