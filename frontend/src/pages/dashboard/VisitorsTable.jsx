import { useState } from 'react'
import {
  User,
  IdCard,
  ClipboardList,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react'

const VisitorTable = () => {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: 'Ali Khan',
      badge: 'CNIC-12345',
      reason: 'Meeting',
      host: 'ahmed@company.com',
      time: '2025-09-19 09:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      badge: 'EMP-9087',
      reason: 'Interview',
      host: 'hr@company.com',
      time: '2025-09-19 10:15 AM',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'John Doe',
      badge: 'DLV-5678',
      reason: 'Delivery',
      host: 'ops@company.com',
      time: '2025-09-19 11:00 AM',
      status: 'Approved'
    }
  ])

  const updateStatus = (id, status) => {
    setVisitors(prev => prev.map(v => (v.id === id ? { ...v, status } : v)))
  }

  return (
    <div className='lg:ml-64 min-h-screen bg-gradient-to-br from-[#f0f4f9] to-[#dce7f3] p-6'>
      {/* Page Title */}
      <h1 className='text-2xl md:text-3xl font-bold text-[#104c80] text-center mb-8'>
        🛡️ Visitor Management - Admin Dashboard
      </h1>

      {/* Visitors Table */}
      <div className='max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden'>
        {/* Table Header */}
        <div className='bg-gradient-to-r from-[#104c80] to-[#0d3a62] px-6 py-3'>
          <h2 className='text-white font-semibold'>Checked-in Visitors</h2>
        </div>

        {/* Responsive Table Container */}
        <div className='overflow-x-auto'>
          <table className='w-full table-auto text-sm md:text-base text-left border-collapse'>
            {/* Table Head */}
            <thead className='bg-[#104c80] text-white sticky top-0 z-10'>
              <tr>
                <th className='px-2 py-3 w-12 text-center'>#</th>
                <th className='px-4 py-3'>
                  <div className='flex items-center gap-1'>
                    <User size={14} /> Name
                  </div>
                </th>
                <th className='border px-1 py-3'>
                  <div className='flex items-center gap-1'>
                    <IdCard size={14} /> ID / Badge
                  </div>
                </th>
                <th className='px-4 py-3'>
                  <div className='flex items-center gap-1'>
                    <ClipboardList size={14} /> Reason
                  </div>
                </th>
                <th className='px-4 py-3'>
                  <div className='flex items-center gap-1'>
                    <Mail size={14} /> Host
                  </div>
                </th>
                <th className='px-4 py-3'>Check-in Time</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {visitors.map((v, i) => (
                <tr
                  key={v.id}
                  className={`border-b transition ${
                    i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                  } hover:bg-slate-100`}
                >
                  <td className='px-4 py-3 text-center'>{i + 1}</td>
                  <td className='px-4 py-3 font-medium'>{v.name}</td>
                  <td className='px-4 py-3'>{v.badge}</td>
                  <td className='px-4 py-3'>{v.reason}</td>
                  <td className='px-4 py-3'>{v.host}</td>
                  <td className='px-4 py-3 text-slate-600'>{v.time}</td>
                  <td className='px-4 py-3'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        v.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : v.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-center flex flex-col sm:flex-row gap-2 justify-center'>
                    <button
                      onClick={() => updateStatus(v.id, 'Approved')}
                      className='inline-flex items-center justify-center gap-1 px-3 py-1 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition text-xs font-medium'
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(v.id, 'Rejected')}
                      className='inline-flex items-center justify-center gap-1 px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-xs font-medium'
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default VisitorTable
