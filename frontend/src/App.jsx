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
import Users from "./pages/dashboard/Users";
import StDocuments from "./pages/StudentDashboard/StDocuments";
import StComplaints from "./pages/StudentDashboard/StComplaints";
import StudentNavbar from "./pages/StudentDashboard/common/StudentNavbar";
import StudentSidebar from "./pages/StudentDashboard/common/StudentSidebar";

const MainFunction = () => {
  return (
    <div>
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
      { path: "/users", element: <Users /> },
      { path: "/admincomplain", element: <AdminComplain /> }],
  },
  {
    element: <StudentRoute />,
    children: [
      {path: "/stdocuments", element: <StDocuments/>},
      {path: "/stcomplaints", element: <StComplaints />}
    ]

  }
]);
function App() {


  return <RouterProvider router={router} />;
}

export default App;
