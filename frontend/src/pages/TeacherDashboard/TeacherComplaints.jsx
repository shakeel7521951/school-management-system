import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import ComplaintModal from '../../components/teacherDashboard/teacherComplaints/ComplaintModal'
import ComplaintDetailModal from '../../components/teacherDashboard/teacherComplaints/CompalintDetailModal'
import ComplaintTable from '../../components/teacherDashboard/teacherComplaints/ComplaintTable'

const TeacherComplaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Projector not working in Room 12',
      date: 'Sep 8, 2025',
      status: 'Pending',
      type: 'Admin',
      description: 'The projector is not turning on, tried multiple plugs.'
    },
    {
      id: 2,
      title: 'Broken chair in staff room',
      date: 'Sep 6, 2025',
      status: 'Pending',
      type: 'Admin',
      description: 'One chair is broken and needs replacement.'
    },
    {
      id: 3,
      title: 'WiFi connectivity issue',
      date: 'Sep 4, 2025',
      status: 'In Review',
      type: 'Admin',
      description: 'WiFi signal drops intermittently in the library.'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    type: ''
  })

  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Resolved: 'bg-green-100 text-green-700 border-green-300',
    'In Review': 'bg-blue-100 text-blue-700 border-blue-300'
  }

  const statusIcons = {
    Pending: <Clock size={16} />,
    Resolved: <CheckCircle2 size={16} />,
    'In Review': <AlertCircle size={16} />
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!newComplaint.title.trim()) return

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    setComplaints([
      {
        id: complaints.length + 1,
        title: newComplaint.title,
        date: today,
        status: 'Pending',
        type: newComplaint.type,  
        description: newComplaint.description
      },
      ...complaints
    ])

    setNewComplaint({ title: '', description: '', type: '' })
    setShowModal(false)
  }

  return (
    <div className='p-4 sm:p-6 lg:ml-64 bg-gray-50 min-h-screen md:ml-20 '>
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
      
        </div>
        <button
          onClick={() => setShowModal(true)}
          className='px-4 py-2 sm:px-5 sm:py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition font-medium'
        >
          + Submit Complaint
        </button>
      </motion.div>

      {/* Complaints Table */}
      <div className='overflow-x-auto'>
        <ComplaintTable
          complaints={complaints}
          statusStyles={statusStyles}
          statusIcons={statusIcons}
          setSelectedComplaint={setSelectedComplaint} // pass click handler
        />
      </div>

      {/* New Complaint Modal */}
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

      {/* Complaint Detail Modal */}
      <AnimatePresence>
        {selectedComplaint && (
          <ComplaintDetailModal
            complaint={selectedComplaint}
            statusStyles={statusStyles}
            statusIcons={statusIcons}
            onClose={() => setSelectedComplaint(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default TeacherComplaints
