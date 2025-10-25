import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import AnnouncementDetailModal from './AnnouncementDetailModal'

const AnnouncementCard = ({ announcement, index }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <li
        onClick={() => setShowDetail(true)}
        className='group relative p-5 border rounded-xl bg-gradient-to-r from-[#f9fbfd] to-[#f3f8fc]
             hover:from-[#e8f2fc] hover:to-[#d9eafa] shadow-sm hover:shadow-lg
             transition duration-300 ease-out cursor-pointer'
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-medium text-lg text-gray-800 group-hover:text-[#104c80] transition-colors'>
              {announcement.title}
            </p>
            <p className='text-gray-500 text-xs'>{announcement.date}</p>
          </div>

          <ArrowRight
            size={18}
            className='text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500'
          />
        </div>

        <span className='absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#104c80]/30 transition-all duration-500 pointer-events-none'></span>
      </li>

      {showDetail && (
        <AnnouncementDetailModal
          announcement={announcement}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}

export default AnnouncementCard
