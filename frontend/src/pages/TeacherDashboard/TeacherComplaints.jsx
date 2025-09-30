import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react'
import ComplaintModal from '../../components/teacherDashboard/teacherComplaints/ComplaintModal'
import ComplaintTable from '../../components/teacherDashboard/teacherComplaints/ComplaintTable'
import ComplaintDetailModal from '../../components/teacherDashboard/teacherComplaints/ComplaintDetailModal'
import ComplaintKPICards from '../../components/teacherDashboard/teacherComplaints/ComplaintKPICards'

const workflow = [
  'Submitted',
  'Under Review',
  'Action Taken',
  'Closed',
  'Rejected'
]

const TeacherComplaints = () => {
  const [complaints, setComplaints] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const [newComplaint, setNewComplaint] = useState({
    employeeName: '',
    jobTitle: '',
    department: '',
    date: '',
    type: '',
    severity: 'Normal',
    details: '',
    impact: '',
    expectedAction: '',
    complaintDetails: ''
  })

  const statusStyles = {
    Submitted: 'bg-gray-100 text-gray-700 border-gray-300',
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-300',
    'Action Taken': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Closed: 'bg-green-100 text-green-700 border-green-300',
    Rejected: 'bg-red-100 text-red-700 border-red-300'
  }

  const statusIcons = {
    Submitted: <Clock size={16} />,
    'Under Review': <AlertCircle size={16} />,
    'Action Taken': <Clock size={16} />,
    Closed: <CheckCircle2 size={16} />,
    Rejected: <XCircle size={16} />
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!newComplaint.employeeName.trim() || !newComplaint.details.trim())
      return

    const today = new Date().toISOString().split('T')[0]

    setComplaints([
      {
        id: complaints.length + 1,
        ...newComplaint,
        date: today,
        status: 'Submitted'
      },
      ...complaints
    ])

    setNewComplaint({
      employeeName: '',
      jobTitle: '',
      department: '',
      date: '',
      type: '',
      severity: 'Normal',
      details: '',
      impact: '',
      expectedAction: '',
      complaintDetails: ''
    })

    setShowModal(false)
  }

  const handleNextStage = id => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          const currentIndex = workflow.indexOf(c.status)
          const nextStatus = workflow[currentIndex + 1] || c.status
          return { ...c, status: nextStatus }
        }
        return c
      })
    )
    setSelectedComplaint(null)
  }

  // ✅ KPI counts
  const totalComplaints = complaints.length
  const rejectedComplaints = complaints.filter(
    c => c.status === 'Rejected'
  ).length
  const pendingComplaints = complaints.filter(
    c => c.status === 'Submitted' || c.status === 'Under Review'
  ).length

  return (
    <div className='p-4 sm:p-6 lg:ml-64 md:ml-20 bg-gray-50 min-h-screen'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'
      >
      <div>

 <h2 className='text-3xl sm:text-4xl font-extrabold text-[#1a4480] tracking-tight'>
          Complaints
        </h2>
        <p className='text-gray-600 text-md mt-1'>
          Submit your concerns here and track their progress until they are
          resolved.
        </p>


      </div>
       
        <button
          onClick={() => setShowModal(true)}
          className='px-4 py-2 sm:px-5 sm:py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition font-medium'
        >
          + Submit Complaint
        </button>
      </motion.div>

      {/* ✅ KPI Cards (separated) */}
      <ComplaintKPICards
        total={totalComplaints}
        rejected={rejectedComplaints}
        pending={pendingComplaints}
      />

      {/* Table for md and above */}
      <div className='hidden md:block overflow-x-auto'>
        {complaints.length > 0 ? (
          <ComplaintTable
            complaints={complaints}
            statusStyles={statusStyles}
            statusIcons={statusIcons}
            setSelectedComplaint={setSelectedComplaint}
          />
        ) : (
          <div className='bg-white shadow-md rounded-2xl p-8 text-center text-gray-500'>
            <p className='text-lg font-medium'>No complaints submitted yet.</p>
            <p className='text-sm text-gray-400'>
              Click <span className='font-semibold'>+ Submit Complaint</span> to
              add a new one.
            </p>
          </div>
        )}
      </div>

      {/* Cards for mobile */}
      <div className='md:hidden space-y-4'>
        {complaints.length > 0 ? (
          complaints.map(c => (
            <div
              key={c.id}
              className='bg-white rounded-lg shadow p-4 border border-gray-200'
              onClick={() => setSelectedComplaint(c)}
            >
              <div className='flex justify-between items-center mb-2'>
                <h4 className='font-semibold text-gray-800'>
                  {c.employeeName}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    statusStyles[c.status]
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className='text-gray-600 text-sm mb-1'>{c.jobTitle}</p>
              <p className='text-gray-600 text-sm mb-1'>{c.department}</p>
              <p className='text-gray-600 text-sm mb-1'>{c.date}</p>
              <p className='text-gray-600 text-sm'>{c.details}</p>
            </div>
          ))
        ) : (
          <div className='bg-white shadow rounded-lg p-6 text-center text-gray-500'>
            <p>No complaints submitted yet.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <ComplaintModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            newComplaint={newComplaint}
            setNewComplaint={setNewComplaint}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedComplaint && (
          <ComplaintDetailModal
            complaint={selectedComplaint}
            statusStyles={statusStyles}
            statusIcons={statusIcons}
            onClose={() => setSelectedComplaint(null)}
            onNextStage={handleNextStage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default TeacherComplaints
