import React from 'react'
import AdminComplain from '../../components/dashboard/adminComplaints/AdminComplain'
import ComplaintTable from '../../components/dashboard/adminComplaints/ComplaintTable'
import ComplaintStats from '../../components/dashboard/adminComplaints/ComplaintStats'
import ComplaintModals from '../../components/dashboard/adminComplaints/ComplaintModals'
import ComplaintFilters from '../../components/dashboard/adminComplaints/ComplaintFilters'

const Complain = () => {
  return (
    <div>
      <AdminComplain />
      <ComplaintTable />
      <ComplaintStats />
      <ComplaintModals />
      <ComplaintFilters />
    </div>
  )
}

export default Complain