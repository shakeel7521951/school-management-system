import React from 'react'
import { Eye } from 'lucide-react'

const ComplaintTable = ({
  complaints,
  statusStyles,
  statusIcons,
  setSelectedComplaint
}) => {
  return (
    <div className='overflow-x-auto bg-white shadow-md rounded-2xl'>
      <table className='min-w-full border-collapse'>
        {/* Table Head */}
        <thead>
          <tr className='bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide'>
              #
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide'>
              Department
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide'>
              Date
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide'>
              Severity
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide'>
              Status
            </th>
            <th className='px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide'>
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className='divide-y divide-gray-200'>
          {complaints.map((complaint, index) => (
            <tr
              key={complaint.id}
              className='hover:bg-gray-50 transition-colors duration-200'
            >
              <td className='px-6 py-3 text-sm font-medium text-gray-700'>
                {index + 1}
              </td>
              <td className='px-6 py-3 text-sm text-gray-800'>
                {complaint.department || 'Not Assigned'}
              </td>
              <td className='px-6 py-3 text-sm text-gray-500'>
                {complaint.date}
              </td>
              <td className='px-6 py-3 text-sm'>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.severity === 'High'
                      ? 'bg-red-100 text-red-700'
                      : complaint.severity === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {complaint.severity || 'Normal'}
                </span>
              </td>
              <td className='px-6 py-3 text-sm'>
                <span
                  className={`flex items-center gap-1 w-fit px-3 py-1 text-xs font-medium rounded-full border ${
                    statusStyles[complaint.status]
                  }`}
                >
                  {statusIcons[complaint.status]} {complaint.status}
                </span>
              </td>
              <td className='px-6 py-3 text-center'>
                <button
                  onClick={() => setSelectedComplaint(complaint)}
                  className='flex items-center gap-1 text-[#104c80] hover:underline'
                >
                  <Eye size={16} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComplaintTable
