import React, { useState, useEffect } from 'react'
import { Bell, PlusCircle, FileText, Edit, Trash2, Eye, Download, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';

const ResponseForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // holds form id

  // Fetch forms from the backend
  useEffect(() => {
    fetchForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/getForms`, { withCredentials: true });
      setForms(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Error fetching forms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadHTML = (form) => {
    const blob = new Blob([form.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.title || 'form').replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintForm = (form) => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow || !printWindow.document) {
        setError('Unable to open print window. Please check your popup blocker.');
        return;
      }
      printWindow.document.write(form.html);
      printWindow.document.close();

      printWindow.onload = function () {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (e) {
          console.error('Print error:', e);
          setError('Print failed: ' + (e.message || e));
        }
      };
    } catch (err) {
      console.error('Error during print:', err);
      setError(err.message || String(err));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Implement delete (adjust endpoint if your backend uses different route)
  const handleDeleteForm = async (formId) => {
    if (!formId) return;
    try {
      setLoading(true);
      // Default delete path — adjust if your API differs.
      await axios.delete(`${BACKEND_URL}/forms/${formId}`, { withCredentials: true });
      // optimistically remove from UI
      setForms(prev => prev.filter(f => f._id !== formId));
      setDeleteConfirm(null);
      setError(null);
    } catch (err) {
      console.error('Error deleting form:', err);
      // helpful fallback: try alternative endpoint if your backend uses deleteForm route
      try {
        await axios.delete(`${BACKEND_URL}/deleteForm/${formId}`, { withCredentials: true });
        setForms(prev => prev.filter(f => f._id !== formId));
        setDeleteConfirm(null);
        setError(null);
      } catch (err2) {
        console.error('Fallback delete also failed:', err2);
        setError(err2.response?.data?.message || err2.message || 'Delete failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:ml-20 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104c80]"></div>
            <p className="mt-4 text-gray-600">{t('responseForm.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 md:ml-20 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans'>
      <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <h2 className='text-3xl font-bold text-[#104c80] flex items-center gap-2'>
            <FileText className='w-7 h-7 text-[#104c80]' />
            {t('responseForm.title')}
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <p><strong>{t('responseForm.error')}</strong> {String(error)}</p>
            <button
              onClick={fetchForms}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              {t('responseForm.tryAgain')}
            </button>
          </div>
        )}

        {forms.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">{t('responseForm.noForms.title')}</h3>
            <p className="text-gray-500 mt-2">{t('responseForm.noForms.description')}</p>
            <button
              onClick={() => navigate("/form-editor")}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition mx-auto"
            >
              <PlusCircle className='w-5 h-5' /> {t('responseForm.noForms.createButton')}
            </button>
          </div>
        ) : (
          <>
            {/* Table for md+ screens */}
            <div className='hidden md:block overflow-x-auto rounded-xl shadow-lg border border-gray-200'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-[#104c80] text-white text-sm uppercase tracking-wide shadow-sm'>
                    <th className='px-6 py-4 text-left rounded-tl-xl'>{t('responseForm.table.headers.title')}</th>
                    <th className='px-6 py-4 text-left'>{t('responseForm.table.headers.created')}</th>
                    <th className='px-6 py-4 text-left'>{t('responseForm.table.headers.updated')}</th>
                    <th className='px-6 py-4 text-left'>{t('responseForm.table.headers.status')}</th>
                    <th className='px-6 py-4 text-left rounded-tr-xl'>{t('responseForm.table.headers.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form, i) => (
                    <tr
                      key={form._id}
                      className={`transition ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/60`}
                    >
                      <td className='px-6 py-4 text-gray-800 font-semibold'>
                        {form.title}
                      </td>
                      <td className='px-6 py-4 text-gray-700'>{formatDate(form.createdAt)}</td>
                      <td className='px-6 py-4 text-gray-700'>{formatDate(form.updatedAt)}</td>
                      <td className='px-6 py-4'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {form.isPublished ? t('responseForm.table.status.published') : t('responseForm.table.status.draft')}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/view/${form._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                            title={t('responseForm.table.actions.view')}
                            aria-label={t('responseForm.table.actions.view')}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDownloadHTML(form)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition"
                            title={t('responseForm.table.actions.download')}
                            aria-label={t('responseForm.table.actions.download')}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePrintForm(form)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                            title={t('responseForm.table.actions.print')}
                            aria-label={t('responseForm.table.actions.print')}
                          >
                            <Printer className="w-4 h-4" />
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
                <div
                  key={form._id}
                  className='bg-white rounded-xl shadow p-4 border border-gray-200'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-semibold text-gray-800 flex items-center gap-2'>
                      <FileText className='w-4 h-4 text-[#104c80]' /> {form.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {form.isPublished ? t('responseForm.table.status.published') : t('responseForm.table.status.draft')}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>{t('responseForm.mobileCard.created')}</span> {formatDate(form.createdAt)}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>{t('responseForm.mobileCard.updated')}</span> {formatDate(form.updatedAt)}
                  </p>
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/view/${form._id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                        title={t('responseForm.table.actions.view')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/form-editor/${form._id}`)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-full transition"
                        title={t('responseForm.table.actions.edit')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadHTML(form)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition"
                        title={t('responseForm.table.actions.download')}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(form._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                      title={t('responseForm.table.actions.delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
            <h3 className='text-xl font-bold text-[#104c80] mb-4'>
              {t('responseForm.deleteConfirm.title')}
            </h3>
            <p className="text-gray-600 mb-6">{t('responseForm.deleteConfirm.message')}</p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setDeleteConfirm(null)}
                className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition'
              >
                {t('responseForm.deleteConfirm.cancel')}
              </button>
              <button
                onClick={() => handleDeleteForm(deleteConfirm)}
                className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
              >
                {t('responseForm.deleteConfirm.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResponseForm;
