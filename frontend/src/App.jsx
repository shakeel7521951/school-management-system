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
import Overview from './pages/dashboard/Overview'
import AboutUs from './pages/AboutUs'
import Complaints from './pages/Complaints'
import ComplaintForm from './components/complaints/ComplaintForm'
import Users from './pages/dashboard/Users'
<<<<<<< HEAD
=======
import Reports from '../src/components/dashboard/Reports'

>>>>>>> 3c485ba35835a4edc6c32f8463d8226aab8930f0
import StDocuments from './pages/StudentDashboard/StDocuments'
import StComplaints from './pages/StudentDashboard/StComplaints'
import { Toaster } from 'react-hot-toast'
import StudentNavbar from './components/Studentdashboard/common/StudentNavbar'
import StudentSidebar from './components/Studentdashboard/common/StudentSidebar'
import StSettings from './pages/StudentDashboard/StSettings'
import StOverview from './pages/StudentDashboard/StOverview'
import StNotifications from './pages/StudentDashboard/StNotifications'
import TeacherNavbar from './components/teacherDashboard/common/TeacherNavbar'
import TeacherSideBar from './components/teacherDashboard/common/TeacherSideBar'
import TeacherOverview from './pages/TeacherDashboard/TeacherOverview'
import TeacherDocuments from './pages/TeacherDashboard/TeacherDocuments'
import TeacherComplaints from './pages/TeacherDashboard/TeacherComplaints'
import TeacherProfile from './pages/TeacherDashboard/TeacherProfile'
<<<<<<< HEAD
import Documents from './pages/dashboard/Documents'
import AdminComplain from './components/dashboard/adminComplaints/AdminComplain'
import Reports from './components/dashboard/report/Reports'
=======
import RequestedDocuments from './pages/dashboard/AdminDocuments.jsx/RequestedDocuments'
import UploadedDocuments from './pages/dashboard/AdminDocuments.jsx/UploadedDocuments'
import TeacherNotifications from './pages/TeacherDashboard/TeacherNotifications'
>>>>>>> 3c485ba35835a4edc6c32f8463d8226aab8930f0

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
      { path: '/overview', element: <Overview /> },
      { path: 'documents/uploaded', element: <UploadedDocuments /> },

      { path: 'documents/requests', element: <RequestedDocuments /> },

      { path: '/users', element: <Users /> },
      { path: '/admincomplain', element: <AdminComplain /> },
<<<<<<< HEAD
     {
      path :"/reports", element:<Reports />
     }
=======
      {
        path: '/reports',
        element: <Reports />
      }
>>>>>>> 3c485ba35835a4edc6c32f8463d8226aab8930f0
    ]
  },
  {
    element: <StudentRoute />,
    children: [
      { path: '/stoverview', element: <StOverview /> },

      { path: '/stdocuments', element: <StDocuments /> },
      { path: '/stcomplaints', element: <StComplaints /> },
      { path: '/stnotifications', element: <StNotifications /> },

      { path: '/stsettings', element: <StSettings /> }
    ]
  },
  {
    element: <TeacherRoute />,
    children: [
      {
        path: '/teacheroverview',
        element: <TeacherOverview />
      },
      {
        path: '/teacherdocuments',
        element: <TeacherDocuments />
      },
      {
        path: '/teachercomplaints',
        element: <TeacherComplaints />
      },
      {
        path: '/teachernotifications',
        element: <TeacherNotifications />
      },
      {
        path: '/teacherprofile',
        element: <TeacherProfile />
      }
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
