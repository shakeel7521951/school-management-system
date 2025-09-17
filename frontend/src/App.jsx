import './App.css'
import Footer from './components/common/Footer'
import Navbar from './components/common/Navbar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Event from './pages/Event'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sidebaar from './components/dashboard/common/Sidebaar'
import Navbarr from './components/dashboard/common/Navbar'
// import Overview from './pages/dashboard/Overview'
import AboutUs from './pages/AboutUs'
import Complaints from './pages/Complaints'
import ComplaintForm from './components/complaints/ComplaintForm'
import Visitors from './pages/dashboard/Visitors'

// ✅ keep only one Reports import (the correct one)
// import Reports from './components/dashboard/report/Reports'

// ✅ new admin document routes
import RequestedDocuments from './pages/dashboard/AdminDocuments.jsx/RequestedDocuments'
import UploadedDocuments from './pages/dashboard/AdminDocuments.jsx/UploadedDocuments'

// import StDocuments from './pages/StudentDashboard/StDocuments'
import StComplaints from './pages/StudentDashboard/StComplaints'
import { Toaster } from 'react-hot-toast'
import StudentNavbar from './components/Studentdashboard/common/StudentNavbar'
import StudentSidebar from './components/Studentdashboard/common/StudentSidebar'
// import StSettings from './pages/StudentDashboard/StSettings'
import StOverview from './pages/StudentDashboard/StOverview'
// import StNotifications from './pages/StudentDashboard/StNotifications'
import TeacherNavbar from './components/teacherDashboard/common/TeacherNavbar'
import TeacherSideBar from './components/teacherDashboard/common/TeacherSideBar'
import TeacherOverview from './pages/TeacherDashboard/TeacherOverview'
import TeacherDocuments from './pages/TeacherDashboard/TeacherDocuments'
import TeacherComplaints from './pages/TeacherDashboard/TeacherComplaints'
import TeacherProfile from './pages/TeacherDashboard/TeacherProfile'
import TeacherNotifications from './pages/TeacherDashboard/TeacherNotifications'
import AdminComplain from './components/dashboard/adminComplaints/AdminComplain'

const MainFunction = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const AdminRoute = () => {
  return (
    <div>
      <Navbarr />
      <Sidebaar />
      <Outlet />
    </div>
  )
}

const StudentRoute = () => {
  return (
    <div>
      <StudentNavbar />
      <StudentSidebar />
      <Outlet />
    </div>
  )
}

const TeacherRoute = () => {
  return (
    <div>
      <TeacherNavbar />
      <TeacherSideBar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <MainFunction />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/event', element: <Event /> },
      { path: '/complain', element: <Complaints /> },
      { path: '/contact-us', element: <ContactUs /> },
      { path: '/complainform', element: <ComplaintForm /> },
      { path: '/complainstatus', element: <ComplaintForm /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    element: <AdminRoute />,
    children: [
      { path: 'admincomplain', element: <AdminComplain /> },

      { path: 'documents/uploaded', element: <UploadedDocuments /> },
      { path: 'documents/requests', element: <RequestedDocuments /> },

      // { path: 'overview', element: <Overview /> },
      { path: 'users', element: <Visitors /> },
      // { path: 'reports', element: <Reports /> }
    ]
  },
  {
    element: <StudentRoute />,
    children: [
      { path: 'stcomplaints', element: <StComplaints /> }

      // { path: '/stoverview', element: <StOverview /> },
      // { path: '/stdocuments', element: <StDocuments /> },
      // { path: '/stnotifications', element: <StNotifications /> },
      // { path: '/stsettings', element: <StSettings /> }
    ]
  },
  {
    element: <TeacherRoute />,
    children: [
      // { path: '/teacheroverview', element: <TeacherOverview /> },
      { path: '/teacherdocuments', element: <TeacherDocuments /> },
      // { path: '/teachercomplaints', element: <TeacherComplaints /> },
      // { path: '/teachernotifications', element: <TeacherNotifications /> },
      // { path: '/teacherprofile', element: <TeacherProfile /> }
    ]
  }
])

function App () {
  return (
    <>
      <RouterProvider router={router} />
      {/* 🔥 Toaster is now active for the whole app */}
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px'
          }
        }}
      />
    </>
  )
}

export default App
