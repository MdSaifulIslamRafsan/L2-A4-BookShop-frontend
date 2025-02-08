import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(useCurrentToken);

  if (!token) {
    return <Navigate to={"/sign-in"} replace />;
  }
  

  return children;
};

export default ProtectedRoute;