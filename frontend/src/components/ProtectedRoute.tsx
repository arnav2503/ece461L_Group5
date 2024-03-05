import { useAuth } from "@/components/AuthContext";

import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
