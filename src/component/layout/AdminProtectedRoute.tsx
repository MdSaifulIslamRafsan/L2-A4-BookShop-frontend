import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { logout, selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(useCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();


  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
    dispatch(logout()); 
    toast.success("Logout successful")
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
