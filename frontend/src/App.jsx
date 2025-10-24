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
import TeacherComplaints from './pages/TeacherDashboard/TeacherComplaints'
// import TeacherProfile from './pages/TeacherDashboard/TeacherProfile'
// import TeacherNotifications from './pages/TeacherDashboard/TeacherNotifications'
import EditorPage from './pages/dashboard/EditorPage'
import FormViewer from './pages/dashboard/FormViewer'
import ResponseForm from './pages/TeacherDashboard/TeacherDocuments'
import VisitorTable from './pages/dashboard/VisitorsTable'
import { useProfileQuery } from './redux/slices/UserApi'
import { useEffect } from 'react'
import { clearProfile, setLoading, setProfile } from './redux/slices/UserSlice'
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
import SpeechAndLanguageTherapy from './pages/SpeechTherapy/SpeechAndLanguageTherapy'
import VocationalAndPhysicalDepartment from './pages/SpeechTherapy/VocationalAndPhysicalDepartment'
import NursingDepartment from './pages/SpeechTherapy/NursingDepartment'
import SecurityNavbar from './components/securityDashboard/common/SecurityNavbar'
import SecuritySidebar from './components/securityDashboard/common/SecuritySidebar'
import VisitorPage from './pages/SecurityDashboard/VisitorPage'
import GallerySection from './pages/Tamakon/GallerySection'
import RegistrationForm from './pages/RegistrationForm'
import BackToTopButton from './pages/BackToTopButton'
import NewsPage from './pages/News'
import NewsDetail from './components/news/NewsDetail'
import RoleRoute from './RoleRoute'
import RegistrationData from './pages/dashboard/RegistrationData'
import AnalyticsPage from './pages/dashboard/AnayticsPage'
import AdminStudentComplain from './pages/dashboard/AdminComplaints/AdminStudentComplain'
import AdminTeacherComplain from './pages/dashboard/AdminComplaints/AdminTeacherComplain'
import OrbEffect from './components/common/Footer/OrbEffect'
import DepartSidebar from './components/DepartmentDashboard/common/DepartSidebar'
// import ComplaintPage from './components/DepartmentDashboard/ComplaintPage'
import DepartNavbar from './components/DepartmentDashboard/common/DepartNavbar'
import DepartStudentComplaint from './pages/departmentDashboard/DepartStudentComplaint'
import DepartTeacherComplaint from './pages/departmentDashboard/DepartTeacherComplaint'
import AdminDepartmentPage from './pages/dashboard/AdminDepartmentPage'
import ParentComplaintForm from './pages/ParentComplaintForm'

// import MyProfile from './pages/MyProfile'
import AdminParentComplaints from './pages/dashboard/AdminComplaints/AdminParentsComplaints';
import ScrollToTop from './components/common/ScrollToTop'
import DepartParentsComplaint from './pages/departmentDashboard/DepartParentsComplaint'
import ReceptionistDashboard from './pages/ReceptionistDashboard'
import ReceptionistNavbar from './components/ReceptionistDashboard/common/ReceptionistNavbar'
import ReceptionistSidebar from './components/ReceptionistDashboard/common/ReceptionistSidebar'
import DepartmentDocuments from './pages/departmentDashboard/DepartmentDocuments'
import DepartmentSubmitComplaints from './pages/departmentDashboard/DepartmentSubmitComplaints'
import PlanningNavbar from './components/PlanningDepartDashboard/common/PlanningNavbar'
import PlanningSidebar from './components/PlanningDepartDashboard/common/PlanningSidebar'
import PlanningUploadedDocument from './pages/PlanningDepartDashboard/PlanningUploadedDocument'
import PlanningRequestedDocument from './pages/PlanningDepartDashboard/PlanningRequestedDocument'
import PlanningTeacherComplain from './pages/PlanningDepartDashboard/PlanningComplaints/PlanningTeacherComplain'
import PlanningStudentComplain from './pages/PlanningDepartDashboard/PlanningComplaints/PlanningStudentComplain'
import PlanningParentComplaints from './pages/PlanningDepartDashboard/PlanningComplaints/PlanningParentsComplaints'
import Blogs from './pages/Blogs'

const MainFunction = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <OrbEffect />
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}

const AdminRoute = () => {
  return (
    <div>
      <RoleRoute allowedRoles={["admin"]}>
        <Navbarr />
        <Sidebaar />
        <Outlet />
        <ScrollToTop />
      </RoleRoute>
    </div>
  )
}

const StudentRoute = () => {
  return (
    <div>
      <RoleRoute allowedRoles={["student"]}>
        <StudentNavbar />
        <StudentSidebar />
        <Outlet />
        <ScrollToTop />
      </RoleRoute>
    </div>
  )
}

const TeacherRoute = () => {
  return (
    <div>
      <RoleRoute allowedRoles={["teacher"]}>
        <TeacherNavbar />
        <TeacherSideBar />
        <Outlet />
        <ScrollToTop />
      </RoleRoute>
    </div>
  )
}
const SecurityRoute = () => {
  return (
    <div>
      <RoleRoute allowedRoles={["guard"]}>
        <SecurityNavbar />
        <SecuritySidebar />
        <Outlet />
        <ScrollToTop />
      </RoleRoute>
    </div>
  )
}

const DepartmentRoute = () => {
  return (
    <div>
      <RoleRoute allowedRoles={["manager"]}>
        <DepartNavbar />
        <DepartSidebar />
        <Outlet />
        <ScrollToTop />
      </RoleRoute>
    </div>
  )
}

const ReceptionistRoute = () => {
  return (
    <div>
      <ReceptionistNavbar />
      <ReceptionistSidebar />
      <Outlet />
      <ScrollToTop />
    </div>
  )
}

const PlanningRoute = () => {
  return (
    <div>
      <PlanningNavbar />
      <PlanningSidebar />
      <Outlet />
      <ScrollToTop />
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
      { path: "/tamakon-team/:slug", element: <PersonalProfile /> },
      { path: "/director-message", element: <DirectorManagerMessage /> },
      { path: "/acting-director-message", element: <ActingDirectorGeneralMessage /> },
      { path: "/school-fees", element: <SchoolFee /> },
      { path: "/recruitment", element: <Recruitment /> },
      { path: "/faqs", element: <FAQs /> },
      { path: "/middle-unit", element: <MiddleAndHighUnit /> },
      { path: "/primary-unit", element: <PrimaryUnit /> },
      { path: "/public-relations", element: <PublicRelations /> },
      { path: "/financial-affairs", element: <FinancialAndAdministrativeAffairs /> },
      { path: "/educational-unit", element: <SpecializedEducationalUnit /> },
      { path: "/speech-therapy", element: <SpeechAndLanguageTherapy /> },
      { path: "/vocational-rehabilitation", element: <VocationalAndPhysicalDepartment /> },
      { path: "/nursing-department", element: <NursingDepartment /> },
      { path: "/gallery", element: <GallerySection /> },
      { path: "/registration-form", element: <RegistrationForm /> },
      { path: '/blog', element: <Blogs /> },
      // { path: '/services', element: <Event /> },
      { path: '/contact-us', element: <ContactUs /> },
      { path: '/news', element: <NewsPage /> },
      { path: "/news/:slug", element: <NewsDetail /> },
      // { path: '/complainform', element: <ComplaintForm /> },
      // { path: '/complainstatus', element: <ComplaintForm /> },
      { path: '/my-profile', element: <ProfilePage /> },
      { path: "/parent-complaint-form", element: <ParentComplaintForm /> }

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
      { path: 'studentcomplain', element: <AdminStudentComplain /> },
      { path: 'teachercomplain', element: <AdminTeacherComplain /> },
      { path: 'parentcomplain', element: <AdminParentComplaints /> },
      { path: 'visitortable', element: <VisitorTable /> },
      { path: 'documents/uploaded', element: <UploadedDocuments /> },
      { path: 'documents/requests', element: <RequestedDocuments /> },
      // { path: 'overview', element: <Overview /> },
      { path: 'users', element: <Users /> },
      { path: 'registration-data', element: <RegistrationData /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/departments", element: <AdminDepartmentPage /> },
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
      { path: '/teachercomplaints', element: <TeacherComplaints /> },
      // { path: '/teachernotifications', element: <TeacherNotifications /> },
      // { path: '/teacherprofile', element: <TeacherProfile /> }
    ]
  },
  {
    element: <SecurityRoute />,
    children: [
      { path: '/visitor', element: <VisitorPage /> },
    ]
  },
  { path: "/form-editor", element: <EditorPage /> },
  { path: "/form-editor/:id", element: <EditorPage /> },
  { path: "/view/:id", element: <FormViewer /> },


  {
    element: <DepartmentRoute />,
    children: [
      { path: '/student-complaint', element: <DepartStudentComplaint /> },
      { path: '/teacher-complaint', element: <DepartTeacherComplaint /> },
      { path: '/parent-complaint', element: <DepartParentsComplaint /> },
      { path: "/depart-documents", element: <DepartmentDocuments /> },
      { path: '/submit-complaint', element: <DepartmentSubmitComplaints /> },


    ]
  },
  {
    element: <ReceptionistRoute />,
    children: [
      { path: '/visitors', element: <ReceptionistDashboard /> },
    ]
  },


  {
    element: <PlanningRoute />,
    children: [
      { path: "/planning-uploaded", element: <PlanningUploadedDocument /> },
      { path: "/planning-requested", element: <PlanningRequestedDocument /> },
      { path: "/planning-teacher-complaints", element: <PlanningTeacherComplain /> },
      { path: "/planning-students-complaints", element: <PlanningStudentComplain /> },
      { path: "/planning-parents-complaints", element: <PlanningParentComplaints /> }



    ]
  }
])

function App() {
  const dispatch = useDispatch();
  const { data: profileData, isLoading } = useProfileQuery();

  useEffect(() => {
    dispatch(setLoading(true));
    if (!isLoading) {
      if (profileData?.user) {
        dispatch(setProfile(profileData.user));
      } else {
        dispatch(clearProfile());
      }
    }
  }, [profileData, isLoading, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
}

export default App
