import React, { useState, useEffect } from 'react'
import { Bell, PlusCircle, FileText, Edit, Trash2, Eye, Download, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useTranslation } from 'react-i18next';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FormManagement = () => {
  const { t } = useTranslation("adminRequestedDocuments")
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [timer, setTimer] = useState({}); // for countdown

  useEffect(() => {
    fetchForms();
  }, []);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimer = {};
      forms.forEach(form => {
        updatedTimer[form._id] = getRemainingTime(form.createdAt, form.fillDuration);
      });
      setTimer(updatedTimer);
    }, 1000);

    return () => clearInterval(interval);
  }, [forms]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/getForms`, { withCredentials: true });
      setForms(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error(t("errors.fetchError"), err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete-form/${id}`, { withCredentials: true });
      setForms(forms.filter(form => form._id !== id));
      setDeleteConfirm(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error(t("errors.deleteError"), err);
    }
  };

  // ✅ Elegant Download with Banner & Styling
  const handleDownloadHTML = (form) => {
    const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${form.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f8fa;
            padding: 40px 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .form-container {
            width: 80%;
            max-width: 800px;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 40px;
          }
          .banner {
            display: block;
            width: 90%;
            margin: 0 auto 30px auto;
            border-radius: 8px;
          }
          h1, h2, h3 {
            color: #104C80;
            text-align: center;
            margin-bottom: 20px;
          }
          input, select, textarea {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 6px;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            font-size: 15px;
          }
          button {
            background-color: #104C80;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 16px;
          }
          @media print {
            body { background: white; }
            .form-container {
              box-shadow: none;
              border: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="form-container">
          <img 
            src="${window.location.origin}/images/img-7.jpeg" 
            alt="Banner" 
            class="banner"
          />
          ${form.html}
        </div>
      </body>
    </html>
    `;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ✅ Elegant Print with Banner & Styling
  const handlePrintForm = (form) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${form.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f8fa;
            padding: 40px 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .form-container {
            width: 80%;
            max-width: 800px;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 40px;
          }
          .banner {
            display: block;
            width: 90%;
            margin: 0 auto 30px auto;
            border-radius: 8px;
          }
          h1, h2, h3 {
            color: #104C80;
            text-align: center;
            margin-bottom: 20px;
          }
          input, select, textarea {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 6px;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            font-size: 15px;
          }
          @media print {
            body { background: white; }
            .form-container {
              box-shadow: none;
              border: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="form-container">
          <img src="${window.location.origin}/images/img-7.jpeg" alt="Banner" class="banner" />
          ${form.html}
        </div>
      </body>
    </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', t("dates.formatOptions"));
  };

  // Function to calculate remaining time
  const getRemainingTime = (createdAt, fillDuration) => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    const endTime = createdTime + fillDuration * 24 * 60 * 60 * 1000;
    const remaining = endTime - now;

    if (remaining <= 0) return "Expired";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="p-6 md:ml-20 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104c80]"></div>
            <p className="mt-4 text-gray-600">{t("page.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans'>
      <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <h2 className='text-3xl font-bold text-[#104c80] flex items-center gap-2'>
            <FileText className='w-7 h-7 text-[#104c80]' />
            {t("page.title")}
          </h2>
          <button
            onClick={() => navigate("/form-editor")}
            className='flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition'
          >
            <PlusCircle className='w-5 h-5' /> {t("page.createButton")}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <p>{t("errors.fetchError")}: {error}</p>
            <button
              onClick={fetchForms}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              {t("errors.tryAgain")}
            </button>
          </div>
        )}

        {forms.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">{t("page.empty.title")}</h3>
            <p className="text-gray-500 mt-2">{t("page.empty.description")}</p>
            <button
              onClick={() => navigate("/form-editor")}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition mx-auto"
            >
              <PlusCircle className='w-5 h-5' /> {t("page.empty.createButton")}
            </button>
          </div>
        ) : (
          <>
            {/* Table for md+ screens */}
            <div className='hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-200'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-[#104c80] text-white text-sm uppercase tracking-wide shadow-sm'>
                    <th className='px-6 py-4 text-left rounded-tl-xl'>{t("table.headers.title")}</th>
                    <th className='px-6 py-4 text-left'>{t("table.headers.created")}</th>
                    <th className='px-6 py-4 text-left'>Time left</th>
                    <th className='px-6 py-4 text-left'>{t("table.headers.status")}</th>
                    <th className='px-6 py-4 text-left rounded-tr-xl'>{t("table.headers.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form, i) => (
                    <tr
                      key={form._id}
                      className={`transition ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/60`}
                    >
                      <td className='px-6 py-4 text-gray-800 font-semibold'>{form.title}</td>
                      <td className='px-6 py-4 text-gray-700'>{formatDate(form.createdAt)}</td>
                      <td className='px-6 py-4 text-gray-700'>{timer[form._id]}</td>
                      <td className='px-6 py-4'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {form.isPublished ? t("table.status.published") : t("table.status.draft")}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className="flex items-center gap-2">
                          <button onClick={() => navigate(`/view/${form._id}`)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition" title={t("table.rowActions.view")}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => navigate(`/form-editor/${form._id}`)} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition" title={t("table.rowActions.edit")}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDownloadHTML(form)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition" title={t("table.rowActions.download")}>
                            <Download className="w-4 h-4" />
                          </button>
                          <button onClick={() => handlePrintForm(form)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition" title={t("table.rowActions.print")}>
                            <Printer className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm(form._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition" title={t("table.rowActions.delete")}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className='block md:hidden space-y-4'>
              {forms.map((form) => (
                <div key={form._id} className='bg-white rounded-xl shadow p-4 border border-gray-200'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-semibold text-gray-800 flex items-center gap-2'>
                      <FileText className='w-4 h-4 text-[#104c80]' /> {form.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {form.isPublished ? t("mobileCard.status.published") : t("mobileCard.status.draft")}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'><span className='font-medium'>{t("table.headers.created")}:</span> {formatDate(form.createdAt)}</p>
                  <p className='text-sm text-gray-600'><span className='font-medium'>{t("table.headers.updated")}:</span> {formatDate(form.updatedAt)}</p>
                  <p className='text-sm text-gray-600'><span className='font-medium'>Time left:</span> {timer[form._id]}</p>
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/view/${form._id}`)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition" title={t("mobileCard.actions.view")}><Eye className="w-4 h-4" /></button>
                      <button onClick={() => navigate(`/form-editor/${form._id}`)} className="p-2 text-green-600 hover:bg-green-100 rounded-full transition" title={t("mobileCard.actions.edit")}><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDownloadHTML(form)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition" title={t("mobileCard.actions.download")}><Download className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => setDeleteConfirm(form._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition" title={t("mobileCard.actions.delete")}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className='fixed px-3 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-2xl shadow-2xl w-96 animate-fadeIn'>
            <h3 className='text-xl font-bold text-[#104c80] mb-4'>{t("modal.deleteConfirmation.title")}</h3>
            <p className="text-gray-600 mb-6">{t("modal.deleteConfirmation.message")}</p>
            <div className='flex justify-end gap-3'>
              <button onClick={() => setDeleteConfirm(null)} className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'>{t("modal.deleteConfirmation.cancel")}</button>
              <button onClick={() => handleDeleteForm(deleteConfirm)} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'>{t("modal.deleteConfirmation.confirm")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormManagement
