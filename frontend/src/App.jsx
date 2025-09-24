import './App.css'
import Footer from './pages/Footer'
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
import Complaints from './pages/Complaints'
import ComplaintForm from './components/complaints/ComplaintForm'
import Users from './pages/dashboard/Users'
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
// import StOverview from './pages/StudentDashboard/StOverview'
// import StNotifications from './pages/StudentDashboard/StNotifications'
import TeacherNavbar from './components/teacherDashboard/common/TeacherNavbar'
import TeacherSideBar from './components/teacherDashboard/common/TeacherSideBar'
// import TeacherOverview from './pages/TeacherDashboard/TeacherOverview'
// import TeacherDocuments from './pages/TeacherDashboard/TeacherDocuments'
// import TeacherComplaints from './pages/TeacherDashboard/TeacherComplaints'
// import TeacherProfile from './pages/TeacherDashboard/TeacherProfile'
// import TeacherNotifications from './pages/TeacherDashboard/TeacherNotifications'
import AdminComplain from './components/dashboard/adminComplaints/AdminComplain'
import EditorPage from './pages/dashboard/EditorPage'
import FormViewer from './pages/dashboard/FormViewer'
import ResponseForm from './pages/TeacherDashboard/TeacherDocuments'
import VisitorTable from './pages/dashboard/VisitorsTable'
import VisitorForm from './pages/VisitorForm'
import { useProfileQuery } from './redux/slices/UserApi'
import { useEffect } from 'react'
import { clearProfile, setProfile } from './redux/slices/UserSlice'
import { useDispatch } from 'react-redux';
import OtpVerify from './pages/OtpVerify'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProfilePage from './pages/ProfilePage'
// import TeamSection from './components/Tamakon/team/TeamSection'
import AboutUs from './pages/Tamakon/AboutUs'
import DirectorManagerMessage from './pages/Tamakon/DirectorManagerMessage'
import ActingDirectorGeneralMessage from './pages/Tamakon/ActingDirectorGeneralMessage'
import SchoolFee from './pages/Tamakon/SchoolFee'
import Recruitment from './pages/Tamakon/Recruitment'
import FAQs from './pages/Tamakon/FAQs'
import MiddleAndHighUnit from './pages/AcademicServices/MiddleAndHighUnit'
import PrimaryUnit from './pages/AcademicServices/PrimaryUnit'
import Team from './pages/Tamakon/Team'
import PersonalProfile from './pages/Tamakon/PersonalProfile'
import PublicRelations from './pages/PublicRelations'
import FinancialAndAdministrativeAffairs from './pages/FinancialAndAdministrativeAffairs'
import SpecializedEducationalUnit from './pages/AcademicServices/SpecializedEducationalUnit'
// import MyProfile from './pages/MyProfile'

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
      { path: '/about-tamakon', element: <AboutUs /> },
      { path: "/tamakon-team", element: <Team /> },
      { path: "/tamakon-team/:id", element: <PersonalProfile /> },
      { path: "/director-message", element: <DirectorManagerMessage /> },
      { path: "/acting-director-message", element: <ActingDirectorGeneralMessage /> },
      // { path: "/school-fees", element: <SchoolFee /> },
      // { path: "/recruitment", element: <Recruitment /> },
      { path: "/faqs", element: <FAQs /> },
      { path: "/middle-unit", element: <MiddleAndHighUnit /> },
      { path: "/primary-unit", element: <PrimaryUnit /> },
      { path: "/public-relations", element: <PublicRelations /> },
      {path: "/financial-affairs", element: <FinancialAndAdministrativeAffairs />},
      { path: "/educational-unit", element: <SpecializedEducationalUnit /> },



      { path: '/services', element: <Event /> },
      { path: '/media', element: <Complaints /> },
      { path: '/contact-us', element: <ContactUs /> },
      { path: '/complainform', element: <ComplaintForm /> },
      { path: '/complainstatus', element: <ComplaintForm /> },
      { path: '/visitor', element: <VisitorForm /> },
      { path: '/my-profile', element: <ProfilePage /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/OtpVerify', element: <OtpVerify /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    element: <AdminRoute />,
    children: [
      { path: 'admincomplain', element: <AdminComplain /> },
      { path: 'visitortable', element: <VisitorTable /> },

      { path: 'documents/uploaded', element: <UploadedDocuments /> },
      { path: 'documents/requests', element: <RequestedDocuments /> },

      // { path: 'overview', element: <Overview /> },
      { path: 'users', element: <Users /> },
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
      { path: '/teacherdocuments', element: <ResponseForm /> },
      // { path: '/teachercomplaints', element: <TeacherComplaints /> },
      // { path: '/teachernotifications', element: <TeacherNotifications /> },
      // { path: '/teacherprofile', element: <TeacherProfile /> }
    ]
  },
  { path: "/form-editor", element: <EditorPage /> },
  { path: "/form-editor/:id", element: <EditorPage /> },
  { path: "/view/:id", element: <FormViewer /> }
])

function App() {
  const dispatch = useDispatch();
  const { data: profileData } = useProfileQuery();
  useEffect(() => {
    if (profileData) {
      dispatch(setProfile(profileData.user));
    } else {
      dispatch(clearProfile());
    }
  }, [profileData, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
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
