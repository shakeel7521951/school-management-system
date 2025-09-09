import "./App.css";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Complaints from "./pages/Complaints";
import ComplaintForm from "./components/complaints/ComplaintForm";
import AboutUs from "./pages/AboutUs";



const MainFunction = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
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
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);
function App() {
 
  return <RouterProvider router={router} />;
}

export default App;
