import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  selectUserProfile,
  selectUserLoading,
} from "./redux/slices/UserSlice";

const RoleRoute = ({ children, allowedRoles }) => {
  const user = useSelector(selectUserProfile);
  const loading = useSelector(selectUserLoading);
  const [redirectTo, setRedirectTo] = useState(null);
  const location = useLocation();

  console.log("RoleRoute - User:", user);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You must be logged in to access this page");
        setRedirectTo("/login");
        return;
      }

      // ✅ Extract user department name safely
      const userDept =
        user?.department?.name ||
        user?.department ||
        "";

      // ✅ Full access departments
      const fullAccessDepartments = [
        "Office of the General Director",
        "Office of the International Educational Development Advisor",
      ];

      // ✅ Limited-access department
      const limitedAccessDepartment =
        "Department of Strategic Planning for Quality and School Accreditation";

      // ✅ Check if it's an Admin dashboard route
      const isAdminDashboard = [
        "/studentcomplain",
        "/teachercomplain",
        "/parentcomplain",
        "/visitortable",
        "/documents",
        "/users",
        "/registration-data",
        "/analytics",
        "/departments",
      ].some((path) => location.pathname.startsWith(path));

      // ✅ Role-based and department-based access
      let isAllowed =
        allowedRoles.includes(user.role) ||
        fullAccessDepartments.includes(userDept);

      if (isAdminDashboard) {
        // ✅ Limited department rules
        if (userDept === limitedAccessDepartment) {
          const restrictedPaths = [
            "/studentcomplain",
            "/teachercomplain",
            "/parentcomplain",
          ];

          const isRestricted = restrictedPaths.some((path) =>
            location.pathname.startsWith(path)
          );

          if (isRestricted) {
            toast.error("You are not authorized to view complaints");
            setRedirectTo("/");
            isAllowed = false;
          } else {
            isAllowed = true;
          }
        }
      }

      // 🚫 Final check
      if (!isAllowed && !redirectTo) {
        toast.error("You are not authorized to access this page");
        setRedirectTo("/");
      }
    }
  }, [user, loading, allowedRoles, location.pathname]);

  if (loading) return <div>Loading...</div>;
  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return children;
};

export default RoleRoute;
