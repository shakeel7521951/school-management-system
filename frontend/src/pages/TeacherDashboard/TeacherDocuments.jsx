import React, { useState } from 'react'
import { Search, Upload } from 'lucide-react'
import DocumentTable from '../../components/teacherDashboard/teacherDocuments/DocumentTable'
import ViewModal from '../../components/teacherDashboard/teacherDocuments/ViewModal'
import UploadModal from '../../components/teacherDashboard/teacherDocuments/UploadModal'

const TeacherDocuments = () => {
  const [search, setSearch] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(null)
  const [docs, setDocs] = useState([
    {
      id: 1,
      title: 'Attendance Report',
      date: 'Sep 10, 2025',
      status: 'Approved',
      type: 'Attendance',
      fileName: 'attendance_report.xlsx',
      reviewerNotes: 'Approved by Admin.'
    },
    {
      id: 2,
      title: 'Student Progress Report',
      date: 'Sep 12, 2025',
      status: 'Pending',
      type: 'Report',
      fileName: 'progress_report.pdf',
      reviewerNotes: '—'
    },
    {
      id: 3,
      title: 'Grades Report - Class 8',
      date: 'Sep 14, 2025',
      status: 'Rejected',
      type: 'Grades',
      fileName: 'grades_class8.xlsx',
      reviewerNotes: 'Please recheck marks calculation.'
    },
   
  ])

  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadType, setUploadType] = useState('')
  const [uploadFile, setUploadFile] = useState(null)

  const getStatusBadge = status => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border border-green-300'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      case 'Rejected':
        return 'bg-red-100 text-red-700 border border-red-300'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredDocs = docs.filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocs(prev => prev.filter(d => d.id !== id))
    }
  }

  const handleFileChange = e => {
    const f = e.target.files[0]
    if (f) setUploadFile(f)
  }

  const handleUpload = e => {
    e.preventDefault()
    if (!uploadTitle.trim() || !uploadType || !uploadFile) {
      alert('Please provide title, type and choose a file.')
      return
    }
    const newDoc = {
      id: docs.length + 1,
      title: uploadTitle.trim(),
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      type: uploadType,
      fileName: uploadFile.name,
      reviewerNotes: '—'
    }
    setDocs(prev => [newDoc, ...prev])
    setShowUploadModal(false)
    setUploadTitle('')
    setUploadType('')
    setUploadFile(null)
  }

  const handleDownload = doc => {
    alert(`Download started: ${doc.fileName} (simulated)`)
  }

  return (
    <div className='p-6 lg:ml-64 md:ml-20 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between  mb-8 gap-4'>
        <h2 className='text-4xl font-extrabold text-[#1a4480]  tracking-tight'>
          Documents
        </h2>
        <div className='flex items-center gap-3 w-full sm:w-auto'>
          <div className='relative w-full max-w-xs'>
            <Search
              className='absolute top-2.5 left-3 text-gray-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Search documents...'
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#104c80]/40 focus:outline-none'
            />
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className='flex items-center gap-2 px-4 py-2 bg-[#104c80] text-white rounded-lg shadow hover:bg-[#0d3a61] transition'
          >
            <Upload size={16} /> Upload
          </button>
        </div>
      </div>

      {/* Table */}
      <DocumentTable
        docs={filteredDocs}
        onView={setShowViewModal}
        onDelete={handleDelete}
        onDownload={handleDownload}
        getStatusBadge={getStatusBadge}
      />

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleUpload}
          uploadTitle={uploadTitle}
          setUploadTitle={setUploadTitle}
          uploadType={uploadType}
          setUploadType={setUploadType}
          uploadFile={uploadFile}
          handleFileChange={handleFileChange}
        />
      )}
      {showViewModal && (
        <ViewModal
          doc={showViewModal}
          onClose={() => setShowViewModal(null)}
          onDownload={handleDownload}
          getStatusBadge={getStatusBadge}
        />
      )}
    </div>
  )
}

export default TeacherDocuments
