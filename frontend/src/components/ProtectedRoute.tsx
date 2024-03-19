import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Spinner />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
