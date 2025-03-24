import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
