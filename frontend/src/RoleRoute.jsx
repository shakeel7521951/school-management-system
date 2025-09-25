import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { selectUserProfile, selectUserLoading } from "./redux/slices/UserSlice";

const RoleRoute = ({ children, allowedRoles }) => {
    const user = useSelector(selectUserProfile);
    const loading = useSelector(selectUserLoading);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                toast.error("You must be logged in to access this page");
                setRedirectTo("/login");
            } else if (!allowedRoles.includes(user.role)) {
                toast.error("You are not authorized to access this page");
                setRedirectTo("/");
            }
        }
    }, [user, loading, allowedRoles]);

    if (loading) return <div>Loading...</div>;

    if (redirectTo) return <Navigate to={redirectTo} replace />;

    return children;
};

export default RoleRoute;
