import React from 'react'
import StudentDocuments from '../../components/Studentdashboard/STdocuments/StudentDocuments'
import StudentDocumentModal from '../../components/Studentdashboard/STdocuments/StudentDocumentModal'

const StDocuments = () => {
  return (
    <div className='md:ml-20 lg:ml-64'>
    <StudentDocuments />
    <StudentDocumentModal />
    </div>
  )
}

export default StDocuments