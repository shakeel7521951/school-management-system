import StudentComplaints from '../../components/Studentdashboard/stComplaints/StudentComplaints'
import StudentComplaintModal from '../../components/Studentdashboard/stComplaints/StudentComplaintModal'

const StComplaints = () => {
  return (
    <div className='md:ml-20 lg:ml-64'>
      <StudentComplaints />
      <StudentComplaintModal />
    </div>
  )
}

export default StComplaints