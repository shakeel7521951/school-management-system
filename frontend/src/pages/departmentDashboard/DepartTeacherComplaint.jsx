import React from 'react'
import DepartTeacherComplaints from '../../components/DepartmentDashboard/DepartTeacherComplaints/DepartTeacherComplaints'
import DepartComplaintFilters from '../../components/DepartmentDashboard/DepartTeacherComplaints/DepartComplaintFilters'

const DepartTeacherComplaint = () => {
  return (
    <div  className="ml-72">
      <DepartTeacherComplaints />
      <DepartComplaintFilters />
    </div>
  )
}

export default DepartTeacherComplaint