import "./App.css";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebaar from "./components/dashboard/common/Sidebaar";
import Navbarr from "./components/dashboard/common/Navbar";
import Overview from "./pages/dashboard/Overview";
import AdminComplain from "./pages/dashboard/AdminComplain";
import AboutUs from "./pages/AboutUs";
import Complaints from "./pages/Complaints";
import ComplaintForm from "./components/complaints/ComplaintForm";
import Documents from "./components/dashboard/overview/Documents";
import DocumentDetail from "./components/dashboard/overview/DocumentDetail";
import Users from "./pages/dashboard/Users";
import Reports from "./components/dashboard/overview/Reports";

import StDocuments from "./pages/StudentDashboard/StDocuments";
import StComplaints from "./pages/StudentDashboard/StComplaints";
import { Toaster } from "react-hot-toast";
import StudentNavbar from "./components/Studentdashboard/common/StudentNavbar";
import StudentSidebar from "./components/Studentdashboard/common/StudentSidebar";
import StSettings from "./pages/StudentDashboard/StSettings";

const MainFunction = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const AdminRoute = () => {
  return (
    <div>
      <Navbarr />
      <Sidebaar />
      <Outlet />
    </div>
  );
};

const StudentRoute = () => {
  return (
    <div>
      <StudentNavbar />
      <StudentSidebar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <MainFunction />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/event", element: <Event /> },
      { path: "/complain", element: <Complaints /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/complainform", element: <ComplaintForm /> },
      { path: "/complainstatus", element: <ComplaintForm /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    element: <AdminRoute />,
    children: [
      { path: "/overview", element: <Overview /> },
      { path: "/documents", element: <Documents /> },
      { path: "/documentdetail", element: <DocumentDetail /> },
      { path: "/users", element: <Users /> },
      { path: "/admincomplain", element: <AdminComplain /> },
      { path: "/reports", element: <Reports /> },
    ],
  },
  {
    element: <StudentRoute />,
    children: [
      { path: "/stdocuments", element: <StDocuments /> },
      { path: "/stcomplaints", element: <StComplaints /> },
      { path: "/settings", element: <StSettings/>}
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* 🔥 Toaster is now active for the whole app */}
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

export default App;
